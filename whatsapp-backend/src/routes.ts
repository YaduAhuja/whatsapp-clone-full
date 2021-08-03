import { Application, Request, Response } from "express";
import { validateRequest } from "./middleware";
import log from "./logger";

export default function (app: Application) {
	//Health Check
	app.get("/healthcheck", (req: Request, res: Response) => {
		res.send("The Servers are Working Fine");
	});

	//Users

	//Registration
	app.post("/api/users", validateRequest(createUserSchema), createUserHandler);


	//Messages
	app.post("/message", (req: Request, res: Response) => {
		log.info(req.body);
		log.info(req.headers);
		res.sendStatus(200);
	});



}