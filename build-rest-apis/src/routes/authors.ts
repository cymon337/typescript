import { FileUploader } from '../middlewares/FileUploader';
import { ErrorHandler } from '../utils/ErrorHandler';
import { AuthorsController } from './../controllers/AuthorsController';
import express from "express";


const authorsController = new AuthorsController

const router = express.Router();

router.get("/", ErrorHandler.handleErrors(authorsController.getAuthors));

router.get("/:id", ErrorHandler.handleErrors(authorsController.getAuthor));

router.post(
    "/", 
    FileUploader.upload("image", "authors", 2 * 1024 * 1024), 
    ErrorHandler.handleErrors(authorsController.create),
);

router.put(
    "/:id", 
    ErrorHandler.handleErrors(authorsController.update),
);

router.delete(
    "/:id",
    ErrorHandler.handleErrors(authorsController.delete),
);

export default router;