import { MongooseModuleOptions } from '@nestjs/mongoose';
import {
  FilterQuery,
  ObjectId,
  QueryOptions,
  SaveOptions,
} from 'mongoose';
import { ConnectionModel } from './types';

export abstract class IDataBaseService {
  abstract getDefaultConnection<T = MongooseModuleOptions>(
    options?: ConnectionModel,
  ): T;
}

export abstract class IRepository<T> {
  abstract isConnected(): Promise<void>;

  abstract create(
    document: object,
    saveOptions?: SaveOptions,
  ): Promise<T>;

  abstract drop(id: ObjectId): Promise<T>;

  abstract findOne<TQuery = FilterQuery<T>, TOptions = QueryOptions<T>>(
    filter: TQuery,
    options?: TOptions,
  ): Promise<T>;
}
