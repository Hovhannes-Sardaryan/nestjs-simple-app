import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './api-response/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

import { AuthConfig } from './auth.config';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  // private sessionUserAttributes: {};
  constructor(
    @InjectRepository(UsersRepository)
    private readonly authConfig: AuthConfig,
    private userRepository: UsersRepository,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }



  async registerUser(authCredentialsDto: AuthCredentialsDto): Promise<object> {
    const { name, email, password } = authCredentialsDto;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        name,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (error, result) => {
          if (!result) {
            reject(error);
          } else {
            resolve(result.user);
          }
        },
      );
    });
    // await this.userRepository.createUser(authCredentialsDto);
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<object> {
    const { name, email, password } = authCredentialsDto;

    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);

    const user = await this.userRepository.findOne({ name, email });
    if (authCredentialsDto && bcrypt.compare(password, user.password)) {
      return new Promise((resolve, reject) => {
        return newUser.authenticateUser(authenticationDetails, {
          onSuccess: result => resolve(result),
          onFailure: err => reject(err),
        });
      });
    } else {
      throw new UnauthorizedException('Please write correct credentials');
    }
  }
}
