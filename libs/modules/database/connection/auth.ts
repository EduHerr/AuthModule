import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ISecretService } from '../../global/secrets/adapter';
import { SecretsModule } from '../../global/secrets/module';
import { IDataBaseService, IRepository } from '../adapter';
import { ConnectionName } from '../enum';
import { Repository } from '../repository';
import { DataBaseService } from '../service';

@Module({
  providers: [
    {
      provide: IDataBaseService,
      useClass: DataBaseService,
    },
    {
      provide: IRepository,
      useClass: Repository,
    },
  ],
  imports: [
    SecretsModule,
    MongooseModule.forRootAsync({
      connectionName: ConnectionName.AUTH,
      useFactory: ({ MONGO_URL }: ISecretService) =>
        new DataBaseService().getDefaultConnection({ uri: MONGO_URL, dbName: ConnectionName.AUTH }),
      inject: [ISecretService],
    }),
  ],
})
export class AuthDatabaseModule {}