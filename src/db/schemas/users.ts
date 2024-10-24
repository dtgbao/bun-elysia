import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "../../utils/columns.helper";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	firstName: text().notNull(),
	lastName: text().notNull(),
	age: integer(),
	email: text().notNull().unique(),
	gender: text(),
	...timestamps,
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
