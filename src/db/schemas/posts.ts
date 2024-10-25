import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { timestamps } from "../columns.helper";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const posts = pgTable("posts", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	slug: text().$default(() => createId()),
	title: text().notNull(),
	content: text().notNull(),
	userId: integer()
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	...timestamps,
});

export const postsRelations = relations(posts, ({ one }) => ({
	user: one(users, {
		fields: [posts.userId],
		references: [users.id],
	}),
}));
