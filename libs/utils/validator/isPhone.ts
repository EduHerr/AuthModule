import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'isPhone', async: false })
export class IsPhoneConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        const regx = new RegExp(`^[0-9]{10}$`);
        return regx.test(value);
    }

    defaultMessage(args: ValidationArguments) {
        return 'El telefono debe de contener solo numeros y 10 caracteres como minimo y mamximo';
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
