import { and, eq, ilike, or, SQL } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schemas/users";
import { CreateUserDto, FilterUser } from "./user.model";

export async function insertUser(data: CreateUserDto) {
	const [insertedUser] = await db.insert(users).values(data).returning();
	return insertedUser;
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

export async function getUser(params: Partial<{ email: string; id: number }>) {
	const filters: SQL[] = [];
	if (params.email) filters.push(eq(users.email, params.email));
	if (params.id) filters.push(eq(users.id, params.id));

	return await db.query.users.findFirst({
		where: and(...filters),
	});
}

export async function findUsers(filterData: Partial<FilterUser>) {
	const filters: SQL[] = [];
	if (filterData.email) {
		filters.push(ilike(users.email, `%${filterData.email}%`));
	}
	if (filterData.name) {
		filters.push(ilike(users.firstName, `%${filterData.name}%`));
		filters.push(ilike(users.lastName, `%${filterData.name}%`));
	}
	if (filterData.gender) {
		filters.push(eq(users.gender, filterData.gender));
	}
	return await db.query.users.findMany({
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
