import { Elysia, t } from "elysia";
import { HttpStatusCode } from "../../core/models/response.model";
import { AuthUser } from "./auth.model";
import { jwtPlugin } from "../../core/plugins/jwt.plugin";

export const authService = new Elysia({ name: "auth/service" })
	.use(jwtPlugin)
	.state({
		user: {} as Partial<AuthUser>,
	})
	.macro(({ onBeforeHandle }) => ({
		isAuth(enabled: boolean) {
			if (!enabled) return;
			onBeforeHandle(async ({ error, cookie: { auth }, jwt, store }) => {
				if (!auth)
					return error(HttpStatusCode.Unauthorized, {
						message: "Unauthorized",
					});

				const user = await jwt.verify(auth.value);
				if (!user)
					return error(HttpStatusCode.Unauthorized, {
						message: "Unauthorized",
					});

				store.user = user as AuthUser;
			});
		},
	}));

export const getUserSession = new Elysia()
	.use(authService)
	.guard({
		as: "scoped",
		isAuth: true,
	})
	.resolve({ as: "scoped" }, ({ store }) => ({ ...store }));
