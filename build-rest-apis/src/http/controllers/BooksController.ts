import { CreateAuthorDTO, UpdateAuthorDTO } from '../dtos/CreateAuthorDTO';
import { Request, Response } from 'express';
import { AppDataSource } from '../../database/data-source';
import { Author } from '../../database/entities/Author';
import { ResponseUtil } from '../../utils/Response';
import { Paginator } from '../../database/Paginator';
import { validate, validateOrReject } from 'class-validator';
import { Book } from '../../database/entities/Book';

export class BooksController{
    
    async get(req: Request, res: Response) {

        const builder = await AppDataSource.getRepository(Book).createQueryBuilder().orderBy("id","DESC");

        const {records: books, paginationInfo} = await Paginator.paginate(builder, req);

        return ResponseUtil.sendResponse(res, "Fetched books successfully", books, paginationInfo);

    }

    async getBook(req: Request, res: Response) {

        const {id} = req.params;

        const book = await AppDataSource.getRepository(Book).findOneByOrFail({
            id: Number(id),
        });

        return ResponseUtil.sendResponse<Book>(
            res, 
            "Fetched book successfully", 
            book
        );

    }

    async create(req: Request, res: Response): Promise<Response> {
        const authorData = req.body;

        authorData.image = req.file?.filename;

        const dto = new CreateAuthorDTO();
        Object.assign(dto, authorData);

        const errors = await validate(dto);
        if (errors.length > 0) {
            return ResponseUtil.sendError(res, "Invalid data", 422, errors)
        }

        const repo = AppDataSource.getRepository(Author);
        const author = repo.create(authorData);
        await repo.save(author);

        return ResponseUtil.sendResponse(res, "Successfully created new author", author, null, 200)
    }

    async update(req: Request, res: Response): Promise<Response> {
        
        const {id} = req.params;
        const authorData = req.body;

        // validation
        const dto = new UpdateAuthorDTO();
        Object.assign(dto, authorData);
        dto.id = parseInt(id);

        await validateOrReject(dto);
        // const errors = await validate(dto);
        // if (errors.length > 0) {
        //     return ResponseUtil.sendError(res, "Invalid data", 422, errors)
        // }

        const repo = AppDataSource.getRepository(Author)
        const author = await repo.findOneByOrFail({
            id: Number(id),
        });

        repo.merge(author, authorData);
        await repo.save(author);
        
        return ResponseUtil.sendResponse(res, "Successfully updated the author", author, null, 200);

    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Author)
        const author = await repo.findOneByOrFail({
            id: Number(id),
        });
        await repo.remove(author);
        return ResponseUtil.sendResponse(res, "Successfully deleted the author", null);
    }

    
}