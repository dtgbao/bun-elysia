import { Cookie, Elysia, t } from "elysia";
import { HttpStatusCode } from "../../core/models/response.model";
import { AuthUser } from "./auth.model";
import { jwtPlugin } from "../../core/plugins/jwt.plugin";
import { getUser } from "../users/user.service";

export const authService = new Elysia({ name: "auth/service" })
	.use(jwtPlugin)
	.state({
		user: {} as Partial<AuthUser>,
		token: {} as Partial<{ accessToken: string; refreshToken: string }>,
	})
	.macro(({ onBeforeHandle }) => ({
		isAuth(enabled: boolean) {
			if (!enabled) return;
			onBeforeHandle(
				async ({ error, cookie: { _aid }, jwt, store, headers }) => {
					const token = _aid.value ?? headers.authorization?.split(" ")?.[1];
					if (!token)
						return error(HttpStatusCode.Unauthorized, {
							message: "Unauthorized",
						});

					const user = await jwt.verify(token);
					if (!user)
						return error(HttpStatusCode.Unauthorized, {
							message: "Unauthorized",
						});

					store.user = user as AuthUser;
				}
			);
		},
		refreshToken(enabled: boolean) {
			if (!enabled) return;
			onBeforeHandle(
				async ({ cookie: { _rid, _aid }, body, error, jwt, store }) => {
					const data = (body as Record<string, string>) || {};
					const userSession = await jwt.verify(_rid.value ?? data.refreshToken);
					if (!userSession && !data?.email) {
						return error(HttpStatusCode.Unauthorized, {
							message: "Unauthorized",
						});
					}

					const user = await getUser(
						userSession ? { id: +userSession?.id } : { email: data.email }
					);
					if (!user) {
						return error(HttpStatusCode.Unauthorized, {
							message: "Unauthorized",
						});
					}
					_rid.set({
						secrets: "seia",
						value: await jwt.sign({ id: user.id }),
						httpOnly: true,
						maxAge: 1 * 86400, // 1 day,
					});
					_aid.set({
						secrets: "seia",
						value: await jwt.sign({
							id: user.id,
							email: user.email,
							gender: user.gender ?? "unknown",
							firstName: user.firstName,
							lastName: user.lastName,
						}),
						httpOnly: true,
						maxAge: 5 * 60, // 5 minutes,
					});
					store.token = {
						accessToken: _aid.value,
						refreshToken: _rid.value,
					};
				}
			);
		},
	}));

export const requireAuth = new Elysia()
	.use(authService)
	.guard({
		as: "scoped",
		isAuth: true,
	})
	.resolve({ as: "scoped" }, ({ store }) => ({ user: store.user }));

export const refreshTokens = new Elysia()
	.use(authService)
	.guard({
		as: "scoped",
		refreshToken: true,
	})
	.resolve({ as: "scoped" }, ({ store }) => ({ token: store.token }));
