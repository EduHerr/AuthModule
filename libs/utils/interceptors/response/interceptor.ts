import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, map } from 'rxjs';
  import { ResponseMessageKey } from './static';
  import { ApiResponse } from 'libs/utils/types/response.types';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {
    constructor(
      private readonly reflector: Reflector
    ) {}
  
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<any> {
      const responseMsg = this.reflector.get<string>(
          ResponseMessageKey, 
          context.getHandler()
      ) ?? '';
  
  
      return next.handle().pipe(
          map(data => {
              return new ApiResponse(
                  context.switchToHttp().getResponse().statusCode, 
                  responseMsg, 
                  data
              );
          }),
      );
    }
  }
