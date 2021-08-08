import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { MessageDocument } from "../model/message.model";
import { createMessage, findMessageById } from "../service/message.service";

export async function createMessageHandler(req: Request, res: Response, next: NextFunction) {
	try {
		// console.log(req);
		const message = await createMessage(req.body.message);
		req.body.message.messageId = message._id;
		return next();
	} catch (err) {
		log.error(err);
		return res.status(409).send(err.message);
	}
}


export async function getMessageHandler(messageId: MessageDocument["_id"]) {
	return findMessageById(messageId);
}