import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { userRoutes } from "./features/users/user.router";
import { postRoutes } from "./features/posts/post.router";
import { authRoutes } from "./features/auth/auth.router";

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
	.group("/api", (app) => app.use(authRoutes).use(userRoutes).use(postRoutes))
	.listen(Bun.env.PORT ?? 8000);

console.log(`🦊 Elysia is running at ${app.server?.url}`);
