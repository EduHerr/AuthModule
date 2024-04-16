import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';

@ValidatorConstraint({ name: 'isUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly model: Model<any>) {}

  async validate(value: any, args: ValidationArguments) {
    const [field] = args.constraints;
    const existing = await this.model.findOne({ [field]: value });
    return !existing;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} ya esta en uso`;
  }
}

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueConstraint
    });
  };
}
