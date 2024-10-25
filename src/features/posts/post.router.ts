import Elysia, { t } from "elysia";
import { insertPost, updatePost } from "./post.service";
import { createPostDto, updatePostDto } from "./post.model";
import { getUserSession } from "../auth/auth.service";

export const postRoutes = new Elysia({
	prefix: "/post",
	detail: { tags: ["Post"] },
})
	.use(getUserSession)
	.post(
		"/",
		({ body: { title, content }, user }) =>
			insertPost(user.id!, { title, content }),
		{
			body: createPostDto,
		}
	)
	.patch(
		"/:id",
		async ({ params: { id }, body, error, user }) => {
			const updatedPost = await updatePost(id, user.id!, body);
			if (!updatedPost) return error(404, { message: "Post not found" });
			return updatedPost;
		},
		{
			params: t.Object({ id: t.Numeric() }),
			body: updatePostDto,
		}
	);
