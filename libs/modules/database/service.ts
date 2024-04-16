import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { IDataBaseService } from './adapter';
import { ConnectionModel } from './types';

@Injectable()
export class DataBaseService implements IDataBaseService {
  getDefaultConnection<T extends MongooseModuleOptions = MongooseModuleOptions>(config?: ConnectionModel): T {
    return {
      appName: 'auth-module-exam',
      uri: this.getConnectionString(config.uri, config.dbName)
    } as T;
  }

  private getConnectionString(uri: ConnectionModel["uri"], dbName: string): string {
    return uri + dbName;
  }
}