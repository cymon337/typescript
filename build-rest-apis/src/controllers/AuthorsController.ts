import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Author } from '../entities/Author';
import { ResponseUtl } from '../../utils/Response';
import { Paginator } from '../database/Paginator';

export class AuthorsController{

    async getAuthors(req: Request, res: Response) {

        const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id","DESC");

        const {records: authors, paginationInfo} = await Paginator.paginate(builder, req);

        return ResponseUtl.sendResponse(res, "Fetched authors successfully", authors, paginationInfo);

    }

    async getAuthor(req: Request, res: Response) {

        const {id} = req.params;

        const author = await AppDataSource.getRepository(Author).findOneByOrFail({
            id: Number(id),
        });

        return ResponseUtl.sendResponse<Author>(
            res, 
            "Fetched author successfully", 
            author
        );

    }

    async create(req: Request, res: Response): Promise<Response> {
        const authorData = req.body;
        const repo = AppDataSource.getRepository(Author);
        const author = repo.create(authorData);
        await repo.save(author);

        return ResponseUtl.sendResponse(res, "Successfully created new author", author, null, 200)
    }

}