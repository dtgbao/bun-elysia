import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";

export const jwtPlugin = new Elysia().use(
	jwt({
		name: "jwt",
		secret: "secret",
	})
);