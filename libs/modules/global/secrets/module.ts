import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ISecretService } from './adapter';
import { SecretService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: ISecretService,
      useClass: SecretService,
    },
  ],
  exports: [ISecretService],
})
export class SecretsModule {}