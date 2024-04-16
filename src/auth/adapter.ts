import { IRepository } from "libs/modules";
import { UsuarioDocument } from "./schema";

export abstract class IAuthRepository extends IRepository<UsuarioDocument>{}
