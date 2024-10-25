import Elysia, { t } from "elysia";
import { jwtPlugin } from "../../core/plugins/jwt.plugin";
import { getUser } from "../users/user.service";
import { HttpStatusCode } from "../../core/models/response.model";
import _pick from "lodash/pick";
import { signInDto } from "./auth.model";

export const authRoutes = new Elysia({ prefix: "/auth", tags: ["Auth"] })
	.use(jwtPlugin)
	.post(
		"/sign-in",
		async ({ jwt, cookie: { auth }, body, error }) => {
			const user = await getUser({ email: body.email });
			if (!user) {
				return error(HttpStatusCode.NotFound, { message: "User not found" });
			}
			auth.set({
				value: await jwt.sign({
					id: user.id,
					email: user.email,
					gender: user.gender ?? "unknown",
					firstName: user.firstName,
					lastName: user.lastName,
				}),
				httpOnly: true,
				maxAge: 7 * 86400,
			});
			return {
				accessToken: auth.value,
			};
		},
		{
			body: signInDto,
		}
	);
