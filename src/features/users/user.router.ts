import Elysia, { t } from "elysia";
import {
	getUserWithPosts,
	insertUser,
	deleteUser,
	getAllUsers,
} from "./user.service";
import { createUserDto } from "./user.dto";

export const userRoutes = new Elysia({ prefix: "/user" })
	.get("/", () => getAllUsers())
	.get("/:id/posts", ({ params: { id } }) => getUserWithPosts(id), {
		params: t.Object({ id: t.Numeric() }),
	})
	.post(
		"/",
		({ body: { firstName, lastName, email } }) =>
			insertUser({ firstName, lastName, email }),
		{
			body: createUserDto,
		}
	)
	.delete("/:id", ({ params: { id } }) => deleteUser(id), {
		params: t.Object({ id: t.Numeric() }),
	});
