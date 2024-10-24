import Elysia, { t } from "elysia";
import { getUserWithPosts, insertUser, deleteUser } from "./user-service";

export const userRoutes = new Elysia({ prefix: "/user" })
	.get("/:id/posts", ({ params: { id } }) => getUserWithPosts(id), {
		params: t.Object({ id: t.Numeric() }),
	})
	.post(
		"/",
		({ body: { firstName, lastName, email } }) =>
			insertUser({ firstName, lastName, email }),
		{
			body: t.Object({
				firstName: t.String(),
				lastName: t.String(),
				email: t.String(),
			}),
		}
	)
	.delete("/", ({ body: { id } }) => deleteUser(id), {
		body: t.Object({ id: t.Numeric() }),
	});
