import { Application, Request, Response } from "express";
import { validateRequest } from "./middleware";
import { createUserHandler, fetchUsersInvolvedInChat, getChatsOfUser } from "./controller/user.controller";
import { createUserSessionHandler, getUserIdFromSession, invalidateUserSessionHandler, validateUserSessionHandler, validateUserSessionHandlerNext } from "./controller/session.controller";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import requiresSession from "./middleware/requiresSession";
import { addMessageHandler, fetchChatsHandler, validateChatRoomHandler } from "./controller/chatroom.controller";
import { createMessageHandler, fetchMessagesHandler } from "./controller/message.controller";
import requiresMessage from "./middleware/requiresMessage";

export default function (app: Application) {
	//Health Check
	app.get("/healthcheck", (req: Request, res: Response) => {
		res.send("The Servers are Working Fine");
	});

	//Users

	//Registration
	app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

	//Login
	//Login with Email And Password
	app.post("/api/login", validateRequest(createUserSessionSchema), createUserSessionHandler);

	//Login with Session
	app.post("/api/sessions", requiresSession, validateUserSessionHandler);

	//Logout
	app.delete("/api/sessions", requiresSession, invalidateUserSessionHandler);

	//Messages
	//UserSession Handler is still to be modified for both purposes with and without next function
	app.post("/api/message", requiresSession, validateUserSessionHandlerNext, requiresMessage, validateChatRoomHandler, createMessageHandler, addMessageHandler);


	app.get("/api/message", requiresSession, validateUserSessionHandlerNext, getUserIdFromSession, getChatsOfUser, fetchChatsHandler, fetchUsersInvolvedInChat, fetchMessagesHandler);
}