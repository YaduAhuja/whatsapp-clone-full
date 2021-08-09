import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import { ChatRoomDocument } from "../model/chatroom.model";
import User, { UserDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
	try {
		return await User.create(input);
	} catch (error) {
		throw new Error(error);
	}
}

export async function findUser(query: FilterQuery<UserDocument>) {
	return User.findOne(query).lean();
}

export async function findUserById(userId: UserDocument["_id"]) {
	return User.findById(userId).lean();
}

export async function addChatInUser(userId: UserDocument["_id"], chatId: ChatRoomDocument["_id"]) {
	return User.findByIdAndUpdate(userId, {
		$push: {
			chats: chatId
		}
	});
}

export async function validatePassword({
	email,
	password,
}: {
	email: UserDocument["email"];
	password: string;
}) {
	const user = await User.findOne({ email });

	if (!user) {
		return false;
	}

	const isValid = await user.comparePassword(password);

	if (!isValid) {
		return false;
	}

	return omit(user.toJSON(), "password");
};

