import { Application, Request, Response } from "express";
import { validateRequest } from "./middleware";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler } from "./controller/session.controller";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import log from "./logger";
import requiresSession from "./middleware/requiresUser";

export default function (app: Application) {
	//Health Check
	app.get("/healthcheck", (req: Request, res: Response) => {
		res.send("The Servers are Working Fine");
	});

	//Users

	//Registration
	app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

	//Login
	app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

	//Logout
	app.delete("/api/sessions", requiresSession, invalidateUserSessionHandler);


	//Messages
	app.post("/message", (req: Request, res: Response) => {
		log.info(req.body);
		log.info(req.headers);
		res.sendStatus(200);
	});

}