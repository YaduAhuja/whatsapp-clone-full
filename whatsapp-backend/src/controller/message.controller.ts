import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { createMessage } from "../service/message.service";

export async function createMessageHandler(req: Request, res: Response, next: NextFunction) {
	try {
		// console.log(req);
		const message = await createMessage(req.body.message);
		console.log(message);
		req.body.message.messageId = message._id;
		return next();
	} catch (err) {
		log.error(err);
		return res.status(409).send(err.message);
	}
}