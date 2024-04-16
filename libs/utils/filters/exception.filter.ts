import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
    catch(
        ex: HttpException, 
        host: ArgumentsHost
    ){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = ex.getStatus();
        const message = ex.getResponse();

        console.log(`Fuckin error: ${message}`);

        response
        .status(status)
        .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}
