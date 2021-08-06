import mongoose from "mongoose";
import { MessageDocument } from "./message.model";
import { UserDocument } from "./user.model";

export interface ChatRoomDocument extends mongoose.Document {
	users: Array<UserDocument["_id"]>;
	messages: Array<MessageDocument["_id"]>;
	createdAt: Date;
}

const PostSchema = new mongoose.Schema(
	{
		users: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
		messages: { type: [mongoose.Schema.Types.ObjectId], ref: "Message" },
		body: { type: String, default: true },
	},
	{ timestamps: true }
);

const ChatRoom = mongoose.model<ChatRoomDocument>("ChatRoom", PostSchema);

export default ChatRoom;