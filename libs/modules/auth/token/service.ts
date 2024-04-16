import { HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ISecretService } from 'libs/modules/global/secrets/adapter';
import { ApiException } from 'libs/utils';

import { ITokenService as ITokenService } from './adapter';
import { Token } from './types';

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly secret: ISecretService) {}

  sign(model: object, options?: jwt.SignOptions): Token {
    const token = jwt.sign(
      model,
      this.secret.JWT,
      options || {
        expiresIn: '1d',
      },
    );

    return { token };
  }

  async verify(token: string): Promise<jwt.JwtPayload | string> {
    return new Promise((res, rej) => {
      jwt.verify(token, this.secret.JWT, (error, decoded) => {
        if (error)
          rej(new ApiException(error.message, HttpStatus.UNAUTHORIZED, `${TokenService.name}/${this.verify.name}`));

        res(decoded);
      });
    });
  }

  decode(token: string): jwt.JwtPayload | string {
    return jwt.decode(token);
  }
}