import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authorsRoute from "./routes/authors";
import { EntityListenerMetadata } from "typeorm/metadata/EntityListenerMetadata";
import { EntityNotFoundError } from "typeorm";
import { ResponseUtl } from "./utils/Response";


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

// Define a middleware function to handle the errors

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if(err instanceof EntityNotFoundError) {
        return ResponseUtl.sendError(
            res, 
            "Item/page you are looking for does not exist",
            404,
            null
        );
    }

    if (err.message == "Invaild file type") {
        return ResponseUtl.sendError(res, "Invalid file type", 422, null);
    }

    return res.status(500).send({
        success: false,
        message: "Something went wrong",
    });
})



export default app;