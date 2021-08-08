import { NextFunction, Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { get } from "lodash";
import log from "../logger";

import { createSession, findSessionById, updateSession } from "../service/session.service";

export async function createUserSessionHandler(req: Request, res: Response) {
	//Validate the User Email & Password
	const user = await validatePassword(req.body);

	if (!user) {
		return res.status(401).send("Invalid Username or Password");
	}

	//Creating Session
	const session = await createSession(user._id, req.get("user-agent") || "");

	//Returning Both Back
	return res.send({ id: session._id, valid: session.valid });
}

export async function validateUserSessionHandlerNext(req: Request, res: Response, next: NextFunction) {
	let session = get(req, "headers.session");
	if (!session) res.status(403).send("Session Not Found");
	session = await findSessionById(session);
	if (!session || !session.valid) return res.status(403).send("Session Expired");
	if (next) {
		return next();
	}
	return res.sendStatus(200);
}

export async function validateUserSessionHandler(req: Request, res: Response) {
	let session = get(req, "headers.session");
	if (!session) res.status(403).send("Session Not Found");
	session = await findSessionById(session);
	if (!session || !session.valid) return res.status(403).send("Session Expired");
	return res.sendStatus(200);
}

export async function invalidateUserSessionHandler(
	req: Request,
	res: Response
) {
	const sessionId = get(req, "headers.session");
	await updateSession({ _id: sessionId }, { valid: false });

	return res.sendStatus(200);
}


export async function getUserIdFromSession(req: Request, res: Response) {
	const sessionId = get(req, "headers.session");
	const session = await findSessionById(sessionId);
	if (!session) {
		res.status(403).send("Session Not Found or Expired");
	}
	req.headers.user = session?.user;
}