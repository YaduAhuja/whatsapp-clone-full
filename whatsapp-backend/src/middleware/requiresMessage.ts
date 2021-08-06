import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

export default async function requiresMessage(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const message = get(req, "body.message");
	if (!message) {
		return res.sendStatus(403);
	}

	return next();
}