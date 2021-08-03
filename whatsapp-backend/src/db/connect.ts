import mongoose from "mongoose";
import dotenv from "dotenv";
import log from "../logger";
dotenv.config();

const connect = async () => {
	if (!process.env.DB_CONNECTION_STRING) {
		throw new Error("Connection String not Found");
	}
	try {
		await mongoose.connect(process.env.DB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		log.info("DataBase Connected!");
	} catch (error) {
		log.error("Database Error", error);
		process.exit(1);
	}
}

export default connect;