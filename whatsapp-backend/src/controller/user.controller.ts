import { Request, Response } from "express";
import { omit, get } from "lodash";
import log from "../logger";
import { ChatRoomDocument } from "../model/chatroom.model";
import { UserDocument } from "../model/user.model";
import { addChatInUser, createUser, findUserById } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
	try {
		const user = await createUser(req.body);
		return res.send(omit(user.toJSON(), "password"));
	} catch (err) {
		log.error(err);
		return res.status(409).send(err.message);
	}
}

export async function addChatInUsers(users: Array<UserDocument["_id"]>, chatId: ChatRoomDocument["_id"]) {
	try {
		users.forEach(user => {
			log.info("User :" + user);
			addChatInUser(user, chatId);
		});
	} catch (err) {
		log.error(err);
	}
}


export async function getChatsOfUser(req: Request, res: Response) {
	try {
		const id = await get(req, "headers.user");
		const user = await findUserById(id);
		if (!id || !user) res.status(403).send("User not Found");
		req.headers.chats = user?.chats;
	} catch (err) {
		log.error(err);
	}

}