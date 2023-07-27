import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsUnique } from "../validators/IsUniqueValidator";
import { Author } from "../../database/entities/Author";

export class CreateAuthorDTO {
    // 어노테이션 으로 validator 사용
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)    
    name: string;

    @IsNotEmpty()
    @IsEmail() // email 형태로 검사
    @IsUnique(Author, "email") // custom validation
    email: string;

    @IsOptional() // Checks if value is missing and if so, ignores all validators.
    @IsString()
    @MaxLength(200)
    bio: string;

}

export class UpdateAuthorDTO {
        // 어노테이션 으로 validator 사용
        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        @MaxLength(20)    
        name: string;
    
        @IsNotEmpty()
        @IsEmail() // email 형태로 검사
        email: string;
    
        @IsOptional() // Checks if value is missing and if so, ignores all validators.
        @IsString()
        @MaxLength(200)
        bio: string;
}