import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISecretService } from './adapter';

@Injectable()
export class SecretService extends ConfigService implements ISecretService {
  constructor() {
    super();
  }

  ENV = this.get('ENV');
  MONGO_URL = this.get('MONGO_URL');
  JWT = this.get('SECRET_JWT');
  PORT = this.get('PORT');
}