import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'onlyLetters', async: false })
export class OnlyLettersConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return /^[A-Za-z]+$/.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} solo puede contener letras`;
  }
}

export function OnlyLetters(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: OnlyLettersConstraint,
    });
  };
}
