import { t } from "elysia";

export enum HttpStatusCode {
	Ok = 200,
	BadRequest = 400,
	Unauthorized = 401,
	NotFound = 404,
	InternalServerError = 500,
	Forbidden = 403,
}

export const errorResponse = {
	[HttpStatusCode.NotFound]: t.Object({
		message: t.String(),
	}),
	[HttpStatusCode.Forbidden]: t.Object({
		message: t.String(),
	}),
};
