import { HttpStatus } from '@nestjs/common';
import { ApiException } from 'libs/utils';
import { FilterQuery, Model, ObjectId, QueryOptions, SaveOptions } from 'mongoose';
import { Document } from 'mongoose';
import { DateTime } from 'luxon';
import { IRepository } from './adapter';

export class Repository<T extends Document> implements IRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async isConnected(): Promise<void> {
    if (this.model.db.readyState !== 1)
      throw new ApiException(`db ${this.model.db.name} disconnected`, HttpStatus.INTERNAL_SERVER_ERROR, 'Database');
  }

  async create(document: object, saveOptions?: SaveOptions): Promise<any> {
    const createdEntity = new this.model(document);
    const documentSaved = await createdEntity.save(saveOptions);
    return documentSaved.toJSON();
  }

  async drop(id: ObjectId): Promise<T> {
    return await this.model.findByIdAndUpdate(id, 
      { $set: { deltedAt: DateTime.now().toMillis() } }
    );
  }

  async findOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<T> {
    return await this.model.findOne(filter, undefined, options).lean();
  }
}
