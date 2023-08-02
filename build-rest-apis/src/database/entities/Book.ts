import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { DBTable } from "../../constants/DBTable";
import { Author } from "./Author";

@Entity(DBTable.BOOKS)
export class Book {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })    
    description: string;

    // eager 사용시 Author table 도 포함하여 같이 보냄 
    @ManyToOne((type) => Author, (author) => author.books, { eager: true })    
    author: Author;

    @Column()
    authorId: number;

    @Column()
    price: number;

    @Column()
    category: string;

    @Column({nullable: true})
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    

} 