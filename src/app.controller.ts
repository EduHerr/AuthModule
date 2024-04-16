import { Controller, Get, HttpCode } from '@nestjs/common';
import { ResponseMessage } from 'libs/utils/interceptors/response/static';

@Controller()
export class AppController {
  @Get()
  @HttpCode(200)
  @ResponseMessage("API Auth Module Exam")
  getHello(): void {}
}
