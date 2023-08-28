import express from "express";
import { ErrorHandler } from '../http/middlewares/ErrorHandler';
import { AuthController } from "../http/controllers/AuthController";


const authController = new AuthController();

const router = express.Router();

router.post("/register", ErrorHandler.catchErrors(authController.register));

export default router;