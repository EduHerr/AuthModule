import { Module } from '@nestjs/common';

import { ITokenService } from './adapter';
import { TokenService } from './service';
import { SecretsModule } from 'libs/modules/global/secrets/module';
import { ISecretService } from 'libs/modules/global/secrets/adapter';

@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: ITokenService,
      useFactory: (secret: ISecretService) => new TokenService(secret),
      inject: [ISecretService],
    },
  ],
  exports: [ITokenService],
})
export class TokenModule {}