import { eq, ilike, or, SQL } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schemas/users";
import { CreateUserDto, FilterUser } from "./user.model";

export async function insertUser(data: CreateUserDto) {
	const [insertedUser] = await db.insert(users).values(data).returning();
	return insertedUser;
}

export async function getAllUsers() {
	return await db.select().from(users);
}

export async function getUserWithPostById(id: number) {
	return await db.query.users.findFirst({
		where: eq(users.id, id),
		with: {
			posts: {
				columns: {
					id: false,
					deletedAt: false,
				},
			},
		},
	});
}

export async function getUser(filterData: Partial<FilterUser>) {
	const filters: SQL[] = [];
	if (filterData.email) filters.push(eq(users.email, filterData.email));
	if (filterData.name) {
		filters.push(ilike(users.firstName, `%${filterData.name}%`));
		filters.push(ilike(users.lastName, `%${filterData.name}%`));
	}
	return await db.query.users.findFirst({
		where: or(...filters),
	});
}

export async function deleteUser(id: number) {
	const [deletedUser] = await db
		.delete(users)
		.where(eq(users.id, id))
		.returning();
	return deletedUser.id;
}
