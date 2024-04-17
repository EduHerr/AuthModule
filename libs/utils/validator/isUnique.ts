import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'mongoose';

export type IsUniqueInterface = {
  modelo: string,
  field: string
}

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async validate(value: any, args: ValidationArguments) {
    const { field, modelo } = args.constraints[0];
    const existing = await this.connection.models[modelo].findOne({ [field]: value });
    
    return existing ? true : false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} ya esta en uso`;
  }
}

export function IsUnique(options?:IsUniqueInterface, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint
    });
  };
}
