import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPassword', async: false })
export class IsPasswordConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    let regex = new RegExp(`^(?=.*[a-z])$`);
    if (!regex.test(value)) {
      throw 'La contrasenia debe de contener al menos una minuscula';
    }

    regex = new RegExp(`^(?=.*[A-Z])$`);
    if (!regex.test(value)) {
      throw 'La contrasenia debe de contener al menos una mayuscula';
    }

    regex = new RegExp(`^?=.{6,12}$`);
    if (!regex.test(value)) {
      throw 'La contrasenia debe de contener entre 6 y 12 caracteres';
    }

    regex = new RegExp(`^?=.*[0-9].*$`);
    if (!regex.test(value)) {
      throw 'La contrasenia debe de contener como minimo un numero';
    }

    regex = new RegExp(`^(?=.*[@$&])$`);
    if (!regex.test(value)) {
      throw "La contrasenia debe de contener al menos uno de los caracteres especiales '@', '$' o '&'";
    }

    regex = new RegExp(`^(?=.*[0-9])$`);
    if (!regex.test(value)) {
      throw 'La contrasenia debe de contener al menos un número';
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return args.property;
  }
}

export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordConstraint,
    });
  };
}
