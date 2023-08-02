import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { DBTable } from "../../constants/DBTable";

// imgration 이름 옆 timestamp 로 생성순서 결정된다. 순서 유의할것
export class CreateBooksTable1690953950490 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DBTable.BOOKS,
                columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "title",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "description",
                    type: "text",
                    isNullable: false,
                },
                {
                    name: "authorId",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "price",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "category",
                    type: "varchar",
                    length: "255",
                    isNullable: false,
                },
                {
                    name: "image",
                    type: "varchar",
                    length: "255",
                    isNullable: true,
                },
                {
                    name: "createdAt",
                    type: "datetime",
                    default: "now()",
                    isNullable: true,
                },
                {
                    name: "updatedAt",
                    type: "datetime",
                    default: "now()",
                    isNullable: true,
                },
                ],
            }),
            true
        );

        const foreignKey = new TableForeignKey({
            columnNames: ["authorId"],
            referencedColumnNames: ["id"],
            referencedTableName: "authors",
            onDelete: "CASCADE",
        });
      
        await queryRunner.createForeignKey(DBTable.BOOKS, foreignKey);
    }   

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DBTable.BOOKS);
    }
}