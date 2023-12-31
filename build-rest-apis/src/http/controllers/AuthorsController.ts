import { CreateAuthorDTO, UpdateAuthorDTO } from '../dtos/AuthorDTO';
import { Request, Response } from 'express';
import { AppDataSource } from '../../database/data-source';
import { Author } from '../../database/entities/Author';
import { ResponseUtil } from '../../utils/Response';
import { Paginator } from '../../database/Paginator';
import { validate, validateOrReject } from 'class-validator';

export class AuthorsController{
    
    async getAuthors(req: Request, res: Response) {

        const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id","DESC");

        const {records: authors, paginationInfo} = await Paginator.paginate(builder, req);

        return ResponseUtil.sendResponse(res, "Fetched authors successfully", authors, paginationInfo);

    }

    async getAuthor(req: Request, res: Response) {

        const {id} = req.params;

        const author = await AppDataSource.getRepository(Author).findOneByOrFail({
            id: Number(id),
        });

        return ResponseUtil.sendResponse<Author>(
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

        await validateOrReject(dto);

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