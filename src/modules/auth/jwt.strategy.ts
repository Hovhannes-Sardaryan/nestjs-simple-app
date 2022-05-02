import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
// import { Users } from '../../db/entity/user.entity';
import { UsersRepository } from './users.repository';

import { AuthService } from './auth.service';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthConfig } from './auth.config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private readonly authService: AuthService,
    private authConfig: AuthConfig,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: authConfig.clientId,
      issuer: authConfig.authority,
      algorithms: ['RS256'],

    });
  }

  public async validate(payload: JwtPayload) {
    if(!!payload.sub) return !!payload.sub;
    else throw new UnauthorizedException();
  }

  // public async validate(payload: JwtPayload): Promise<Users> { // payload: JwtPayload
  //   const { email } = payload;
  //   const user: Users = await this.usersRepository.findOne({email});
  //   if (!user) throw new UnauthorizedException();

  //   return user;
  // }
}
