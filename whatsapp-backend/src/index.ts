import express, {Application, Request, Response} from 'express';
import hello from "./test";

const app : Application = express();
hello();
app.get("/", (req : Request, res : Response ) => res.send("Hello From Express"));

const add = (x: number, y: number) => x+y;

app.listen("8080", () => console.log("Server is Listening at port 8080"));