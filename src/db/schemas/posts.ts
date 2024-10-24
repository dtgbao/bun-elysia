import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "../../utils/columns.helper";
import { generateUniqueString } from "../../utils/helpers";
import { usersTable } from "./users";

export const postsTable = pgTable("posts", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	slug: text().$default(() => generateUniqueString(16)),
	title: text("title").notNull(),
	content: text("content").notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	...timestamps,
});

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;
