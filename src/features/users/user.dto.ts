import { t } from "elysia";

export const createUserDto = t.Object({
	firstName: t.String({
		error: "First name is required",
	}),
	lastName: t.String({
		error: "Last name is required",
	}),
	email: t.String({
		format: "email",
		error: {
			field: "email",
			message: "Invalid email",
		},
	}),
});
