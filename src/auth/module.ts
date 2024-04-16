import { Module } from '@nestjs/common';
import { IsUniqueConstraint } from 'libs/utils/validator/isUnique';
import { IAuthRepository } from './adapter';
import { AuthRepository } from './repository';
import { Connection, Model } from 'mongoose';
import { Usuario, UsuarioDocument, UsuarioSchema } from './schema';
import { getConnectionToken } from '@nestjs/mongoose';
import { ConnectionName } from 'libs/modules/database/enum';
import { AuthController } from './controller';
import { TokenModule } from 'libs/modules/auth/token/module';
import { EncryptModule } from 'libs/modules/auth/encrypt/module';
import { AuthService } from './service';

@Module({
  imports: [
    TokenModule, 
    EncryptModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthRepository,
      useFactory: (connection: Connection) =>
        new AuthRepository(
          connection.model(
            Usuario.name,
            UsuarioSchema,
          ) as unknown as Model<UsuarioDocument>,
        ),
      inject: [getConnectionToken(ConnectionName.AUTH)],
    },
    AuthService,
    IsUniqueConstraint,
  ],
})
export class AuthModule {}
