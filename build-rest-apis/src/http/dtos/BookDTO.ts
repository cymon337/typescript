import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsUnique } from "../validators/IsUniqueValidator";
import { Book } from "../../database/entities/Book";

export class CreateBookDTO {
    id? : number;

    // 어노테이션 으로 validator 사용
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsUnique(Book, "title")  
    title: string;

    @IsOptional() // Checks if value is missing and if so, ignores all validators.
    @IsString()
    @MaxLength(200)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    authorId: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    category: string;



}

export class UpdateBookDTO {
    id? : number;

    // 어노테이션 으로 validator 사용
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsUnique(Book, "title")
    title: string;

    @IsOptional() // Checks if value is missing and if so, ignores all validators.
    @IsString()
    @MaxLength(200)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    authorId: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    category: string;
}