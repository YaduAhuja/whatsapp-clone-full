import { object, string, ref } from "yup";

export const createUserSchema = object({
	body: object({
		name: string().required("Name is Required"),
		password: string()
			.required("Password is Required")
			.min(6, "Password is too short - should be 6 chars minimum.")
			.matches(/^[a-zA-Z0-9_.-]*$/, "Password can contain only Latin Letters."),
		passwordConfirmation: string().oneOf(
			[ref("password"), null],
			"Password Must Match"
		),
		email: string()
			.email("Must be a Valid Email")
			.required("Email is Required"),
	}),
});


export const createUserSessionSchema = object({
	body: object({
		password: string()
			.required("Password is Required")
			.min(6, "Password is too short - should be 6 chars minimum.")
			.matches(/^[a-zA-Z0-9_.-]*$/, "Password can contain only Latin Letters."),
		email: string()
			.email("Must be a Valid Email")
			.required("Email is Required"),
	}),
});