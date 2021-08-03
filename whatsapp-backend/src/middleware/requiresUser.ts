import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

export default async function requiresUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const user = get(req, "user");
	if (!user) {
		return res.sendStatus(403);
	}
	log.info(`User : ${user}`);

	return next();
}