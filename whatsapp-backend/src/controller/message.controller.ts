import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { MessageDocument } from "../model/message.model";
import { createMessage, findMessageById } from "../service/message.service";
import { get, omit } from "lodash";

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

export async function fetchMessagesHandler(req: Request, res: Response) {
	const chats = get(req, "body.messages") as Array<any>;
	const currentUser = get(req, "headers.user");
	if (!chats || !currentUser) res.status(403).send("Messages Not found");

	for (let i = 0; i < chats.length; i++) {
		const messages = chats[i].messages;
		req.body.messages[i].messages = [];
		// const UsersToBeFetched = users.filter((user: any) => user == currentUser);
		for (let j = 0; j < messages.length; j++) {
			const formatted = await formatMessageForResponse(messages[j]);
			req.body.messages[i].messages.push(formatted);
		}

	}
	return res.status(200).send(req.body.messages);
	// return next();
}


async function formatMessageForResponse(messageId: MessageDocument["_id"]) {
	const message = await findMessageById(messageId);
	if (!message) throw new Error("Message fetch Error");
	return omit(message, ["chatId", "updatedAt", "__v"]);
}