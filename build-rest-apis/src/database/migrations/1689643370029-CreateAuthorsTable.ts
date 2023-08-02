import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { DBTable } from "../../constants/DBTable";

// imgration 이름 옆 timestamp 로 생성순서 결정된다. 순서 유의할것
export class CreateAuthorsTable1689643370029 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(

            new Table({

                name: DBTable.AUTHORS,

                columns: [
                    {                        
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {                        
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {                        
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                        isUnique: true,
                    },
                    {                        
                        name: "bio",
                        type: "text",
                        isNullable: true,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DBTable.AUTHORS);
    }

}
