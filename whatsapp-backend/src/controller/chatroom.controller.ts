import { NextFunction, Request, Response } from "express";
import { get, omit } from "lodash";
import log from "../logger";
import { ChatRoomDocument } from "../model/chatroom.model";
import { addMessageInChatRoom, addUserInChatRoom, createChatRoom, findChatRoomById } from "../service/chatroom.service";
import { addChatInUsers } from "./user.controller";

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
		addChatInUsers([req.body.message.user, req.body.message.receiver], req.body.message.chatId);
	}
	return next();
}


export async function addMessageHandler(req: Request, res: Response) {
	const addedMessage = await addMessageInChatRoom(req.body.message.chatId, req.body.message.messageId);
	if (!addedMessage) return res.sendStatus(403);
	res.sendStatus(200);
}


export async function fetchChatsHandler(req: Request, res: Response, next: NextFunction) {
	const chats = get(req, "body.chats") as Array<ChatRoomDocument["_id"]>;
	if (!chats) res.status(403).send("Chats Not Found");
	req.body.messages = []
	try {
		for (let i = 0; i < chats.length; i++)
			req.body.messages.push(await formatDocumentForResponse(chats[i]));
	} catch (err) {
		res.status(403).send("Chat Fetching error");
	}
	// res.send(req.body.messages);
	return next();
}

async function formatDocumentForResponse(Chat_id: ChatRoomDocument["_id"]) {
	const chat = await findChatRoomById(Chat_id.toString());
	if (!chat) throw new Error("Chat Not Found");
	return omit(chat, ["body", "createdAt", "updatedAt", "__v"]);
}