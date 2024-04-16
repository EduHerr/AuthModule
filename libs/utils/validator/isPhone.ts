import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'isPhone', async: false })
export class IsPhoneConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        const regx = new RegExp(`^[0-9]{10}$`);
        if(!regx.test(value)){
            throw 'El telefono debe de contener solo numeros y 10 caracteres como minimo y mamximo';
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return args.property;
    }
}

export function IsPhone(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsPhoneConstraint,
      });
    };
  }
