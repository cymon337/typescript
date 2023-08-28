import { NextFunction, Request, Response } from "express";
import { RegisterDTO } from "../dtos/AuthDTO";
import { validateOrReject } from "class-validator";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entities/User";
import { ResponseUtil } from "../../utils/Response";

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const registerData = req.body;

        const dto = new RegisterDTO();
        dto.email = registerData.email;
        dto.name = registerData.name;
        dto.password = registerData.password;

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(User);
        const user = repo.create(registerData);
        await repo.save(user);

        return ResponseUtil.sendResponse(res, "Successfully registered", user, null);
    }

    async login(req: Request, res: Response, next: NextFunction) {
        
    }



}