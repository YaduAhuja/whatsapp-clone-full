import { DocumentDefinition } from "mongoose";
import { UserDocument } from "../model/user.model";
import ChatRoom, { ChatRoomDocument } from "../model/chatroom.model";
import { MessageDocument } from "../model/message.model";

export async function createChatRoom(input: DocumentDefinition<ChatRoomDocument>) {
	try {
		return await ChatRoom.create(input);
	} catch (error) {
		throw new Error(error);
	}
}

export async function findChatRoomById(chatId: string) {
	return ChatRoom.findById(chatId).lean();
}

export async function addUserInChatRoom(chatId: string, userId: UserDocument["_id"]) {
	const confirmation = await ChatRoom.findByIdAndUpdate(chatId, { $push: { users: userId } });
	return confirmation ? true : false;
}

export async function addMessageInChatRoom(chatId: string, messageId: MessageDocument["_id"]) {
	const confirmation = await ChatRoom.findByIdAndUpdate(chatId, { $push: { messages: messageId } });
	return confirmation ? true : false;
}