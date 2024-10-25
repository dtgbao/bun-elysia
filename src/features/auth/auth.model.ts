import Elysia, { Static, t } from "elysia";
import { selectUser } from "../users/user.model";

export const signInDto = t.Object({
	email: t.String({ minLength: 1 }),
	password: t.String({ minLength: 8 }),
});

export const authUser = t.Pick(selectUser, [
	"id",
	"email",
	"firstName",
	"lastName",
	"gender",
]);

export type AuthUser = Static<typeof authUser>;
