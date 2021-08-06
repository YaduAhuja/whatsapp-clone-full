import mongoose from "mongoose";
import { ChatRoomDocument } from "./chatroom.model";

export interface UserDocument extends mongoose.Document {
	email: string;
	name: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	chats: Array<ChatRoomDocument>;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		password: { type: String, required: true }
	},
	{ timestamps: true }
);

UserSchema.methods.comparePassword = function (
	candidatePassword: string
) {
	const user = this as UserDocument;
	if (candidatePassword === user.password) return true;
	return false;
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;