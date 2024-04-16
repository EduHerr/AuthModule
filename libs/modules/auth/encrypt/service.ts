import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IEncryptService } from './adapater';

@Injectable()
export class EncryptService implements IEncryptService {
    async encrypt(password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }

    async validate(password: string, hashedPassword: string): Promise<boolean>{
        return await bcrypt.compare(password, hashedPassword);
    }
}
