import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Author } from '../entities/Author';

export class AuthorsController{

    async getAuthors(req: Request, res: Response) {

        const authors = await AppDataSource.getRepository(Author).find();

        return res.status(200).json({
            success: true,
            message: "Fetched authors successfully",
            data: authors,
        })

    }

    async getAuthor(req: Request, res: Response) {

        const {id} = req.params;

        const author = await AppDataSource.getRepository(Author).findOneByOrFail({
            id: Number(id),
        });

        return res.status(200).json({
            success: true,
            message: "Fetched author successfully",
            data: author,
        })

    }

}