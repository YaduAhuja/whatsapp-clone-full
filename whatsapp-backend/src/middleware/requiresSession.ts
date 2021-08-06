import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

export default async function requiresSession(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const session = get(req, "headers.session");
	if (!session) {
		return res.sendStatus(403);
	}

	return next();
}