import { eq } from "drizzle-orm";
import { db } from "../../db";
import { InsertUser, SelectUser, usersTable } from "../../db/schemas/users";
import { postsTable, SelectPost } from "../../db/schemas/posts";

export async function insertUser(data: InsertUser): Promise<SelectUser[]> {
	return await db.insert(usersTable).values(data).returning();
}

export async function getUserWithPosts(
	id: SelectUser["id"]
): Promise<Array<{ users: SelectUser; posts: SelectPost | null }>> {
	return await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, id))
		.leftJoin(postsTable, eq(postsTable.userId, usersTable.id));
}

export async function deleteUser(id: SelectUser["id"]): Promise<void> {
	await db.delete(usersTable).where(eq(usersTable.id, id));
}
