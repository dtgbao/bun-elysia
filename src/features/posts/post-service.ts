import { eq } from "drizzle-orm";
import { db } from "../../db";
import { InsertPost, postsTable, SelectPost } from "../../db/schemas/posts";

export async function insertPost(data: InsertPost): Promise<SelectPost[]> {
	return await db.insert(postsTable).values(data).returning();
}

export async function updatePost(
	id: SelectPost["id"],
	data: Partial<Omit<SelectPost, "id">>
): Promise<SelectPost[]> {
	return await db
		.update(postsTable)
		.set(data)
		.where(eq(postsTable.id, id))
		.returning();
}
