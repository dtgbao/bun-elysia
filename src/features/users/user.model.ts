import { Static, t } from "elysia";
import { createSelectSchema, createInsertSchema } from "drizzle-typebox";
import { users } from "../../db/schemas/users";
import { selectPost } from "../posts/post.model";

const _insertUserSchema = createInsertSchema(users, {
	firstName: t.String({
		minLength: 1,
	}),
	lastName: t.String({
		minLength: 1,
	}),
	email: t.String({
		format: "email",
	}),
	age: t.Optional(
		t.Number({
			minimum: 1,
		})
	),
});
const _selectUserSchema = createSelectSchema(users);

export const createUserDto = t.Pick(_insertUserSchema, [
	"firstName",
	"lastName",
	"age",
	"email",
	"gender",
]);
export const selectUser = t.Omit(_selectUserSchema, ["deletedAt"]);
export const selectUserWithPost = t.Composite([
	selectUser,
	t.Object({ posts: t.Array(t.Omit(selectPost, ["deletedAt"])) }),
]);
export const filterUser = t.Composite([
	t.Pick(_selectUserSchema, ["email", "gender"]),
	t.Object({
		name: t.String({ minLength: 1 }),
	}),
]);

export type CreateUserDto = Static<typeof createUserDto>;
export type SelectUser = Static<typeof selectUser>;
export type FilterUser = Static<typeof filterUser>;
