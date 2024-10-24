import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { userRoutes } from "./features/users/user-router";
import { postRoutes } from "./features/posts/post-router";

const app = new Elysia()
	.use(
		swagger({
			path: "/docs",
			documentation: {
				info: {
					title: "API Documentation",
					version: "1.0.0",
				},
			},
		})
	)
	.group("/api", (app) => app.use(userRoutes).use(postRoutes))
	.listen(process.env.PORT ?? 3000);

console.log(`🦊 Elysia is running at ${app.server?.url}`);
