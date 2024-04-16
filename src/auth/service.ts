import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthRepository } from "./adapter";
import { SignIn, User, UserResponse } from "./types";
import { IEncryptService } from "libs/modules/auth/encrypt/adapater";
import { ITokenService } from "libs/modules/auth/token/adapter";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: IAuthRepository,
        private readonly encryptService: IEncryptService,
        private readonly tokenService: ITokenService
    ){}

    async signUp(
        usuario: User
    ){
        let { contrasenia } = usuario;        
        contrasenia = await this.encryptService.encrypt(contrasenia);
        return await this.userRepository.create({ ...usuario, contrasenia });
    }

    async signIn(
        usuario: SignIn
    ){
        const { correo, contrasenia } = usuario;

        const user = await this.userRepository.findOne({ correo });
        if(!user){
            throw new HttpException('Usuario no existente', 404);
        }

        if(!(await this.encryptService.validate(contrasenia, user.contrasenia))){
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const userResponse: UserResponse = {
            nombre: user.nombre,
            correo: user.correo
        };

        return this.tokenService.sign(userResponse);
    }
}
