import Elysia, { t } from "elysia";
import {
	insertUser,
	deleteUser,
	findUsers,
	getUserWithPostById,
} from "./user.service";
import {
	createUserDto,
	filterUser,
	selectUser,
	selectUserWithPost,
} from "./user.model";
import {
	errorResponse,
	HttpStatusCode,
} from "../../core/models/response.model";
import { getUserSession } from "../auth/auth.service";

export const userRoutes = new Elysia({
	prefix: "/user",
	detail: { tags: ["User"] },
})
	.use(getUserSession)
	.get("/", ({ query }) => findUsers(query), {
		response: t.Array(selectUser),
		query: t.Partial(filterUser),
	})
	.get(
		"/:id/posts",
		async ({ params: { id }, error }) => {
			const user = await getUserWithPostById(id);
			if (!user) {
				return error(HttpStatusCode.NotFound, { message: "User not found" });
			}
			return user;
		},
		{
			params: t.Object({ id: t.Numeric() }),
			response: {
				[HttpStatusCode.Ok]: selectUserWithPost,
				[HttpStatusCode.NotFound]: errorResponse[HttpStatusCode.NotFound],
			},
		}
	)
	.post(
		"/",
		({ body: { firstName, lastName, email } }) =>
			insertUser({ firstName, lastName, email }),
		{
			body: createUserDto,
			response: selectUser,
		}
	)
	.delete("/:id", ({ params: { id } }) => deleteUser(id), {
		params: t.Object({ id: t.Numeric() }),
		response: t.Numeric(),
	});
