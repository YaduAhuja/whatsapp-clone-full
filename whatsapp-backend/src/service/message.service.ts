import { DocumentDefinition } from "mongoose";
import ChatRoom, { ChatRoomDocument } from "../model/chatroom.model";
import Message, { MessageDocument } from "../model/message.model";

export async function createMessage(input: DocumentDefinition<MessageDocument>) {
	try {
		return await Message.create(input);
	} catch (error) {
		throw new Error(error);
	}
}


export async function findMessageById(messageId: MessageDocument["_id"]) {
	return Message.findById(messageId).lean();
}