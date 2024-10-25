import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as userSchemas from "./schemas/users";
import * as postSchemas from "./schemas/posts";

export const client = postgres(Bun.env.DATABASE_URL, { prepare: false });
export const db = drizzle({
	client,
	casing: "snake_case",
	schema: {
		...userSchemas,
		...postSchemas,
	},
});
