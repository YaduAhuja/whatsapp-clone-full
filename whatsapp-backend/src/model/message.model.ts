import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface MessageDocument extends mongoose.Document {
	user: UserDocument["_id"];
	body: string;
	createdAt: Date;
	updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
	{
		postId: {
			type: String,
			required: true,
			unique: true,
			default: () => nanoid(10),
		},
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		body: { type: String, default: true },
	},
	{ timestamps: true }
);

const Message = mongoose.model<MessageDocument>("Message", PostSchema);

export default Message;