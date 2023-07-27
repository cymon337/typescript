import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authorsRoute from "./routes/authors";
import { ErrorHandler } from "./http/middlewares/ErrorHandler";


const app: Express = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/authors", authorsRoute)

app.use("*", (req: Request, res: Response) => {
    return res.status(404).json({
        success: false,
        message: "Invalid route",
    });
});

app.use(ErrorHandler.handleErrors);


export default app;