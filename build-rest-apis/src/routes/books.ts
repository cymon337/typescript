import { FileUploader } from '../http/middlewares/FileUploader';
import { ErrorHandler } from '../http/middlewares/ErrorHandler';
import express from "express";
import { BooksController } from '../http/controllers/BooksController';


const booksController = new BooksController();

const router = express.Router();

router.get("/", ErrorHandler.catchErrors(booksController.get));

router.get("/:id", ErrorHandler.catchErrors(booksController.getBook));

router.post(
    "/", 
    FileUploader.upload("image", "books", 2 * 1024 * 1024), 
    ErrorHandler.catchErrors(booksController.create),
);

router.put(
    "/:id", 
    ErrorHandler.catchErrors(booksController.update),
);

router.delete(
    "/:id",
    ErrorHandler.catchErrors(booksController.delete),
);

export default router;