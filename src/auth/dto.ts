import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { IsPhone } from "libs/utils/validator/isPhone";
import { OnlyLetters } from "libs/utils/validator/onlyLetters";
import { IsUnique } from "libs/utils/validator/isUnique";

export class SignUpDTO{
    @IsNotEmpty({ message: "Nombre no puede ir vacio" })
    @OnlyLetters()
    @Length(2, 10, { 
        message: "Nombre debe de tener como minimo 2 caracteres y 15 como maximo" 
    })
    readonly nombre: string;

    @IsNotEmpty({ message: "Correo no puede ir vacio" })
    @IsEmail()
    @IsUnique({ modelo: 'usuario', field: 'correo' })
    readonly correo: string;

    @IsNotEmpty({ message: "Contraseña no puede ir vacio" })
    @Length(6, 12, { message: "Contraseña debe de contener entre 6 y 12 caracteres" })
    @Matches(/.*[a-z]+.*/, {
        message: "Contraseña debe de contener al menos una letra minuscula"
    })
    @Matches(/.*[A-Z]+.*/, {
        message: "Contraseña debe de contener al menos una letra mayuscula"
    })
    @Matches(/.*[0-9].*/, {
        message: "Contraseña debe de contener al menos un numero"
    })
    @Matches(/.*[@$&]+.*/, { 
        message: "Contraseña debe de contener al menos uno de los siguientes caracteres '@', '$', '&'" 
    })
    readonly contrasenia: string;

    @IsPhone()
    // @IsUnique()
    readonly telefono: string;
}

export class SignInDTO{
    @IsNotEmpty({ message: "Correo no puede ir vacio" })
    @IsEmail()
    readonly correo: string;

    @IsNotEmpty({ message: "Contraseña no puede ir vacio" })
    @Length(6, 12, { message: "Contraseña debe de contener entre 6 y 12 caracteres" })
    @Matches(/.*[a-z]+.*/, {
        message: "Contraseña debe de contener al menos una letra minuscula"
    })
    @Matches(/.*[A-Z]+.*/, {
        message: "Contraseña debe de contener al menos una letra mayuscula"
    })
    @Matches(/.*[0-9].*/, {
        message: "Contraseña debe de contener al menos un numero"
    })
    @Matches(/.*[@$&]+.*/, { 
        message: "Contraseña debe de contener al menos uno de los siguientes caracteres '@', '$', '&'" 
    })
    readonly contrasenia: string;
}
