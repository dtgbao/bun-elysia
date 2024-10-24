import Elysia, { t } from "elysia";
import { insertPost, updatePost } from "./post.service";

export const postRoutes = new Elysia({ prefix: "/post" })
	.post(
		"/",
		({ body: { title, content, userId } }) =>
			insertPost({ title, content, userId }),
		{
			body: t.Object({
				title: t.String(),
				content: t.String(),
				userId: t.Numeric(),
			}),
		}
	)
	.patch(
		"/:id",
		({ params: { id }, body: { title, content } }) =>
			updatePost(id, { title, content }),
		{
			params: t.Object({ id: t.Numeric() }),
			body: t.Object({ title: t.String(), content: t.String() }),
		}
	);
