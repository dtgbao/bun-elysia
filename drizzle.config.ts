import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schemas/*",
	out: "./migrations",
	casing: "snake_case",
	dbCredentials: {
		url: Bun.env.DATABASE_URL,
	},
});
