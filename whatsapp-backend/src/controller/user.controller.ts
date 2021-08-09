import { NextFunction, Request, Response } from "express";
import { omit, get } from "lodash";
import log from "../logger";
import { ChatRoomDocument } from "../model/chatroom.model";
import User, { UserDocument } from "../model/user.model";
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


export async function getChatsOfUser(req: Request, res: Response, next: NextFunction) {
	try {
		// log.info("Getting Chats of users");
		const id = await get(req, "headers.user");
		const user = await findUserById(id);
		if (!id || !user) res.status(403).send("User not Found");
		req.body.chats = user?.chats;
		return next();
	} catch (err) {
		log.error(err);
	}
}

export async function fetchUsersInvolvedInChat(req: Request, res: Response, next: NextFunction) {
	const messages = get(req, "body.messages") as Array<any>;
	const currentUser = get(req, "headers.user");
	if (!messages || !currentUser) res.status(403).send("Messages Not found");

	for (let i = 0; i < messages.length; i++) {
		const users = messages[i].users;
		req.body.messages[i].users = [];
		// const UsersToBeFetched = users.filter((user: any) => user == currentUser);
		for (let j = 0; j < users.length; j++) {
			const formatted = await formatUserForResponse(users[j]);
			req.body.messages[i].users.push(formatted);
		}

	}
	return next();
}


async function formatUserForResponse(userId: UserDocument["_id"]) {
	const user = await findUserById(userId);
	if (!user) throw new Error("User not Found");
	return omit(user, ["chats", "email", "password", "createdAt", "updatedAt", "__v"]);
}