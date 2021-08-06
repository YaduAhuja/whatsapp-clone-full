import mongoose from "mongoose";
import { ChatRoomDocument } from "./chatroom.model";
import { UserDocument } from "./user.model";

export interface MessageDocument extends mongoose.Document {
	user: UserDocument["_id"];
	chatId: ChatRoomDocument["_id"];
	body: string;
	createdAt: Date;
}

const PostSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		chatId: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" },
		body: { type: String, required: true },
	},
	{ timestamps: true }
);

const Message = mongoose.model<MessageDocument>("Message", PostSchema);

export default Message;