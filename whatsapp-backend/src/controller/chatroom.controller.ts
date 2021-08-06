import { NextFunction, Request, Response } from "express";
import { addMessageInChatRoom, addUserInChatRoom, createChatRoom, findChatRoomById } from "../service/chatroom.service";
import { addChatInUser } from "../service/user.service";

//Validates Chat if there is no chat 
//then creates one with 2 person i.e. Sender and Receiver
export async function validateChatRoomHandler(req: Request, res: Response, next: NextFunction) {
	// log.info("Validating Chat");
	const chat = await findChatRoomById(req.body.message.chatId);
	if (!chat) {
		req.body.message.chatId = await createChatRoom(req.body.message);
		req.body.message.chatId = req.body.message.chatId._id;
		await addUserInChatRoom(req.body.message.chatId, req.body.message.receiver);
		await addUserInChatRoom(req.body.message.chatId, req.body.message.user);
		// log.info("Successfully Validated Chat Room!");
		addChatInUser([req.body.message.user, req.body.message.receiver], req.body.message.chatId);
	}
	return next();
}


export async function addMessageHandler(req: Request, res: Response) {
	const addedMessage = await addMessageInChatRoom(req.body.message.chatId, req.body.message.messageId);
	if (!addedMessage) return res.sendStatus(403);
	res.sendStatus(200);
}