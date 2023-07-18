import { AuthorsController } from './../controllers/AuthorsController';
import express from "express";


const authorsController = new AuthorsController

const router = express.Router();

router.get("/", authorsController.getAuthors);

router.get("/:id", authorsController.getAuthor);

export default router;