import { object, string } from "yup";

export const createSessionSchema = object({
	headers: object({
		session: string()
			.required("Session id is Required")
			.min(20, "Session id must be greater than 20 in length")
	}),
});