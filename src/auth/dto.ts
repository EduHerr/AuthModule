import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { IsPassword } from "libs/utils/validator/isPassword";
import { IsPhone } from "libs/utils/validator/isPhone";
import { OnlyLetters } from "libs/utils/validator/onlyLetters";
import { IsUnique } from "libs/utils/validator/isUnique";

export class SignUpDTO{
    @IsNotEmpty()
    @OnlyLetters()
    @Length(2, 15, { 
        message: "Nombre debe de tener como minimo 2 caracteres y 15 como maximo" 
    })
    readonly nombre: string;

    @IsNotEmpty()
    @IsEmail()
    @IsUnique()
    readonly correo: string;

    @IsNotEmpty()
    @IsPassword()
    readonly contrasenia: string;

    @IsPhone()
    @IsUnique()
    readonly telefono: string;
}

export class SignInDTO{
    @IsNotEmpty()
    @IsEmail()
    readonly correo: string;

    @IsNotEmpty()
    @IsPassword()
    readonly contrasenia: string;
}
