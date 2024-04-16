import { Body, Controller, Get, HttpCode, Post, Query, ValidationPipe } from "@nestjs/common";
import { ResponseMessage } from "libs/utils/interceptors/response/static";
import { USER_ADDED } from "./static";
import { SignInDTO, SignUpDTO } from "./dto";
import { AuthService } from "./service";
import { SignInResponse } from "./types";

@Controller('auth')
export class AuthController{
    constructor(
        protected authService: AuthService
    ){}

    @Post('signUp')
    @HttpCode(201)
    @ResponseMessage(USER_ADDED)
    async signUp(
        @Body() user: SignUpDTO
    ): Promise<any>{
        return await this.authService.signUp(user);
    }

    @Get('singIn')
    @HttpCode(200)
    async singIn(
        @Query(ValidationPipe) user: SignInDTO
    ): Promise<SignInResponse>{
        return await this.authService.signIn(user);
    }
}
