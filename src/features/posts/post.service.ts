import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { posts } from "../../db/schemas/posts";
import { CreatePostDto, UpdatePostDto } from "./post.model";

export async function insertPost(currentUserId: number, data: CreatePostDto) {
	return await db
		.insert(posts)
		.values({ ...data, userId: currentUserId })
		.returning();
}

export async function updatePost(
	id: number,
	currentUserId: number,
	data: Partial<UpdatePostDto>
) {
	const [post] = await db
		.select({ userId: posts.userId })
		.from(posts)
		.where(eq(posts.userId, currentUserId));
	if (!post) return null;
	return await db
		.update(posts)
		.set(data)
		.where(and(eq(posts.id, id), eq(posts.userId, currentUserId)))
		.returning();
}
