import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './api-response/auth-credentials.dto';
import { Users } from '../../db/entity/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { first_name, last_name, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    const users = this.create({ first_name, last_name, password: hashedPass });

    try {
      await this.save(users);
    } catch (error) {
      if (Number(error.code) === 23505) {
        // name Dublicate
        throw new ConflictException('first name or last name already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
