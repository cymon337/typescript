import { CreateAuthorDTO, UpdateAuthorDTO } from './../dtos/CreateAuthorDTO';
import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Author } from '../entities/Author';
import { ResponseUtl } from '../utils/Response';
import { Paginator } from '../database/Paginator';
import { validate } from 'class-validator';

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

        authorData.image = req.file?.filename;

        const dto = new CreateAuthorDTO();
        Object.assign(dto, authorData);

        const errors = await validate(dto);
        if (errors.length > 0) {
            return ResponseUtl.sendError(res, "Invalid data", 422, errors)
        }

        const repo = AppDataSource.getRepository(Author);
        const author = repo.create(authorData);
        await repo.save(author);

        return ResponseUtl.sendResponse(res, "Successfully created new author", author, null, 200)
    }

    async update(req: Request, res: Response): Promise<Response> {
        
        const {id} = req.params;
        const authorData = req.body;

        // validation
        const dto = new UpdateAuthorDTO();
        Object.assign(dto, authorData);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return ResponseUtl.sendError(res, "Invalid data", 422, errors)
        }

        const repo = AppDataSource.getRepository(Author)
        const author = await repo.findOneByOrFail({
            id: Number(id),
        });

        repo.merge(author, authorData);
        await repo.save(author);
        
        return ResponseUtl.sendResponse(res, "Successfully updated the author", author, null, 200)

    }

}