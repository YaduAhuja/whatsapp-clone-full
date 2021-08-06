import { Application, Request, Response } from "express";
import { validateRequest } from "./middleware";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler, validateUserSessionHandler } from "./controller/session.controller";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import log from "./logger";
import requiresSession from "./middleware/requiresSession";
import { createSessionSchema } from "./schema/session.schema";
import { addMessageHandler, validateChatRoomHandler } from "./controller/chatroom.controller";
import { createMessageHandler } from "./controller/message.controller";
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
	app.post("/api/message", requiresSession, validateUserSessionHandler, requiresMessage, validateChatRoomHandler, createMessageHandler, addMessageHandler);
}