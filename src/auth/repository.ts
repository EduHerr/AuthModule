import { Injectable } from "@nestjs/common";
import { Usuario, UsuarioDocument } from "./schema";
import { Repository } from "libs/modules";
import { IAuthRepository } from "./adapter";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AuthRepository extends Repository<UsuarioDocument> implements IAuthRepository {
    constructor(@InjectModel(Usuario.name) private readonly user: Model<UsuarioDocument>) {
        super(user);
    }
}
