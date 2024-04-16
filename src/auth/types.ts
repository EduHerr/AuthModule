export interface User {
    nombre: string;
    correo: string;
    contrasenia: string;
    telefono: string;
}

export interface SignIn extends Omit<User, "nombre" | "telefono">{} 
export interface UserResponse extends Omit<User, "contrasenia" | "telefono">{}
export interface SignInResponse {
    token: string;
}
