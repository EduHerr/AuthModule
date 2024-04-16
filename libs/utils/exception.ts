import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  context: string;
  traceid: string;
  code?: string;
  config?: unknown;
  user?: string;

  constructor(
    error: string | object, 
    status?: HttpStatus, 
    private readonly ctx?: string
  ){
    super(error, [status, 500].find(Boolean));

    if (ctx) {
      this.context = ctx;
    }
  }
}
