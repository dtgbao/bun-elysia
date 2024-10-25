import { integer, pgTable, text, pgEnum } from "drizzle-orm/pg-core";
import { timestamps } from "../columns.helper";
import { posts } from "./posts";
import { relations } from "drizzle-orm";

export const genderEnum = pgEnum("gender", ["male", "female", "unknown"]);

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	firstName: text().notNull(),
	lastName: text().notNull(),
	age: integer(),
	email: text().notNull().unique(),
	gender: text({ enum: ["male", "female", "unknown"] }),
	...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));
