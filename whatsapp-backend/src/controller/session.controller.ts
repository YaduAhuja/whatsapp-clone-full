import { Request, Response } from "express";
import log from "../logger";
import { validatePassword } from "../service/user.service";
import { get } from "lodash";
import { createSession, updateSession } from "../service/session.service";

export async function createUserSessionHandler(req: Request, res: Response) {
	//Validate the User Email & Password
	const user = await validatePassword(req.body);

	if (!user) {
		return res.status(401).send("Invalid Username or Password");
	}

	//Creating Session
	const session = await createSession(user._id, req.get("user-agent") || "");

	//Returning Both Back
	return res.send(session.valid);
}

export async function invalidateUserSessionHandler(
	req: Request,
	res: Response
) {
	const sessionId = get(req, "user.session");

	await updateSession({ _id: sessionId }, { valid: false });

	return res.sendStatus(200);
}