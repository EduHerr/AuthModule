export abstract class IEncryptService {
    abstract encrypt(key: string): Promise<string>;
    abstract validate(key: string, hashedKey: string): Promise<boolean>;
}