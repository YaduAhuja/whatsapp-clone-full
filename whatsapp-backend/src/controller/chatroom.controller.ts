import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import log from "../logger";
import { addMessageInChatRoom, addUserInChatRoom, createChatRoom, findChatRoomById } from "../service/chatroom.service";


//Validates Chat if there is no chat 
//then creates one with 2 person i.e. Sender and Receiver
export async function validateChatRoomHandler(req: Request, res: Response, next: NextFunction) {
	log.info("Validating Chat");
	const chat = await findChatRoomById(req.body.chatId);
	if (!chat) {
		req.body.chatId = await createChatRoom(req.body);
		await addUserInChatRoom(req.body.chatId, req.body.receiver);
		await addUserInChatRoom(req.body.chatId, req.body.userId);
	}
	return next();
}


export async function addMessageHandler(req: Request, res: Response) {
	const addedMessage = await addMessageInChatRoom(req.body.chatId, req.body.messageId);
	if (!addedMessage) return res.sendStatus(403);
	res.sendStatus(200);
}