import express, { Application, Request, Response } from 'express';
import log from "./logger";
import dotenv from "dotenv";
import routes from './routes';
import connect from "./db/connect";
import { loggerMiddleware } from './middleware/logger';

dotenv.config()

const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const host = process.env.HOST ? process.env.HOST : "localhost";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(loggerMiddleware);

app.listen(port, host, () => {
	log.info(`Server is Listening at http://${host}:${port}`);
	connect();
	routes(app);
});
