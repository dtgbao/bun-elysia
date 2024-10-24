import { eq } from "drizzle-orm";
import { db } from "../../db";
import { InsertUser, SelectUser, usersTable } from "../../db/schemas/users";
import { postsTable } from "../../db/schemas/posts";

export async function insertUser(data: InsertUser): Promise<SelectUser[]> {
	return await db.insert(usersTable).values(data).returning();
}

export async function getAllUsers() {
	return await db.select().from(usersTable);
}

export async function getUserWithPosts(id: SelectUser["id"]) {
	return await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.id, id))
		.leftJoin(postsTable, eq(postsTable.userId, usersTable.id));
}

export async function deleteUser(id: SelectUser["id"]) {
	return await db.delete(usersTable).where(eq(usersTable.id, id)).returning();
}
