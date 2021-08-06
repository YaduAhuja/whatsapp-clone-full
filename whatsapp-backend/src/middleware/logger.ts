import log from "../logger";
import { NextFunction, Request, Response } from "express";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
	log.info(`Request Details \nIP: ${req.ip}\nMethod: ${req.method}`);
	return next();
}
