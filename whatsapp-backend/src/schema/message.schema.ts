import { object, string } from "yup";

export const createMessageSchema = object({
	body: object({
		user: string().required("User is Required"),
		chatId: string(),
		receiver: string(),
		body: string()
			.required(),
	}),
});