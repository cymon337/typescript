import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions, registerDecorator } from "class-validator";
import { AppDataSource } from "../../database/data-source";
import { Not } from "typeorm";

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    public defaultMessage(): string {
        return `$property is already in use`
    }

    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const [entity, field] = args.constraints

        const repository = AppDataSource.getRepository(entity)

        const isUpdate: boolean = args.object["id"] !== undefined;
        let count = 0;

        console.log(isUpdate);

        if (!isUpdate) {
            count = await repository.count({ where: { [field]: value } });
        } else {
            count = await repository.count({ where: { [field]: value, id: Not(args.object["id"]) } });
        }

        return count <= 0;
    }
}

export function IsUnique(entity: any, field: string, validitionOptions?: ValidatorOptions) {
    return function(object: Object, propertyName: string) {
        // Registers a custom validation decorator.
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validitionOptions,
            constraints: [entity, field],
            validator: IsUniqueConstraint,
        });
        
    };
}