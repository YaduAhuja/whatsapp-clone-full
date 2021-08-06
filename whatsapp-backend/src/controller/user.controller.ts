import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../logger";
import { ChatRoomDocument } from "../model/chatroom.model";
import { UserDocument } from "../model/user.model";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
	try {
		const user = await createUser(req.body);
		return res.send(omit(user.toJSON(), "password"));
	} catch (err) {
		log.error(err);
		return res.status(409).send(err.message);
	}
}

export async function addChatsInUser(users: Array<UserDocument["_id"]>, chatId: ChatRoomDocument["_id"]) {
	try {
		users.forEach((userId) => {
			addChatsInUser(userId, chatId);
		});
	} catch (err) {
		log.error(err);
	}
}