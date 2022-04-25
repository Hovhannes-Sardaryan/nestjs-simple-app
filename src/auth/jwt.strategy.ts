import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Users } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: 'secret-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Users> {
    const { first_name, last_name } = payload;
    const user: Users = await this.usersRepository.findOne({
      first_name,
      last_name,
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
