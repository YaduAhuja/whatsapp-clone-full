import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { createMessage } from "../service/message.service";

export async function createMessageHandler(req: Request, res: Response, next: NextFunction) {
	try {
		const message = await createMessage(req.body);
		req.body["messageId"] = message.id;
		return next();
	} catch (err) {
		log.error(err);
		return res.status(409).send(err.message);
	}
}