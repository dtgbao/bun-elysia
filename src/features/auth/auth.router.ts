import Elysia, { error, t } from "elysia";
import { jwtPlugin } from "../../core/plugins/jwt.plugin";
import { getUser } from "../users/user.service";
import { HttpStatusCode } from "../../core/models/response.model";
import _pick from "lodash/pick";
import { signInDto } from "./auth.model";
import { refreshTokens } from "./auth.service";

export const authRoutes = new Elysia({ prefix: "/auth", tags: ["Auth"] })
	.use(refreshTokens)
	.post(
		"/sign-in",
		async ({ store }) => {
			return {
				accessToken: store.session.accessToken!,
				refreshToken: store.session.refreshToken!,
			};
		},
		{
			body: signInDto,
		}
	)
	.post(
		"/refresh",
		async ({ store }) => {
			return {
				accessToken: store.session.accessToken!,
				refreshToken: store.session.refreshToken!,
			};
		},
		{
			body: t.Optional(
				t.Object({
					refreshToken: t.Optional(t.String()),
				})
			),
			response: {
				[HttpStatusCode.Ok]: t.Object({
					accessToken: t.String(),
					refreshToken: t.String(),
				}),
				[HttpStatusCode.Unauthorized]: t.Object({
					message: t.String(),
				}),
			},
		}
	);
