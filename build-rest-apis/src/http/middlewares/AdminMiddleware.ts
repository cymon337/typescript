import { Request, Response, NextFunction } from "express";
import { User } from "../../database/entities/User";
import { Roles } from "../../constants/Roles";
import { ResponseUtil } from "../../utils/Response";

export class AdminMiddleware {
    static async check(req: Request, res: Response, next:NextFunction) {
        
        // @ts-ignore
        const user = req.user as User;
        if (user.role !== Roles.ADMIN ) {
            return ResponseUtil.sendError(res, "Unauthorized", 403, null);
        }
        next();
    }
}