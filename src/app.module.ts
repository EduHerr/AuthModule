import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'libs/utils/interceptors/response/interceptor';
import { GlobalModule } from 'libs/modules/global/module';
import { AuthDatabaseModule } from 'libs/modules';

@Module({
  imports: [
    AuthModule,
    GlobalModule,
    AuthDatabaseModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ]
})
export class AppModule {}
