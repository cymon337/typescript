import { Request, Response } from 'express';
import { AppDataSource } from '../../database/data-source';
import { ResponseUtil } from '../../utils/Response';
import { Paginator } from '../../database/Paginator';
import { validate, validateOrReject } from 'class-validator';
import { Book } from '../../database/entities/Book';
import { CreateBookDTO, UpdateBookDTO } from '../dtos/BookDTO';

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
        const bookData = req.body;

        bookData.image = req.file?.filename;

        const dto = new CreateBookDTO();
        Object.assign(dto, bookData);
        dto.authorId = parseInt(bookData.authorId);
        dto.price = parseInt(bookData.price);

        const errors = await validate(dto);
        if (errors.length > 0) {
            return ResponseUtil.sendError(res, "Invalid data", 422, errors)
        }

        const repo = AppDataSource.getRepository(Book);
        const book = repo.create(bookData);
        await repo.save(book);

        return ResponseUtil.sendResponse(res, "Successfully created new book", book, null, 200)
    }

    async update(req: Request, res: Response): Promise<Response> {
        
        const {id} = req.params;
        const bookData = req.body;

        // validation
        const dto = new UpdateBookDTO();
        Object.assign(dto, bookData);
        dto.id = parseInt(id);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Book)
        const book = await repo.findOneByOrFail({
            id: Number(id),
        });

        repo.merge(book, bookData);
        await repo.save(book);
        
        return ResponseUtil.sendResponse(res, "Successfully updated the book", book, null, 200);

    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Book)
        const book = await repo.findOneByOrFail({
            id: Number(id),
        });
        await repo.remove(book);
        return ResponseUtil.sendResponse(res, "Successfully deleted the book", null);
    }

    
}