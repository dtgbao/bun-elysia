import { Static, t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { posts } from "../../db/schemas/posts";

const _insertPostSchema = createInsertSchema(posts, {});
const _selectPostSchema = createSelectSchema(posts, {});

export const createPostDto = t.Pick(_insertPostSchema, ["title", "content"]);
export const updatePostDto = t.Pick(_insertPostSchema, ["title", "content"]);
export const selectPost = t.Omit(_selectPostSchema, ["id"]);

export type CreatePostDto = Static<typeof createPostDto>;
export type UpdatePostDto = Static<typeof updatePostDto>;
export type SelectPost = Static<typeof selectPost>;
