import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { BaseEntity } from "libs/modules/database/structure/schema";

@Schema()
export class Usuario extends BaseEntity {
    @Prop()
    nombre: string;

    @Prop({ unique: true, index: true })
    correo: string;

    @Prop()
    contrasenia: string;

    @Prop({ unique: true, index: true })
    telefono: string;
}

export type UsuarioDocument = Usuario & Document;
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
