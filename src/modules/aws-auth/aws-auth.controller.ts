import { BadRequestException, Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
// import { AuthCredentialsDto } from '../auth/api-response/auth-credentials.dto';
import { AwsAuthService } from './aws-auth.service';

@Controller('aws-auth')
export class AwsAuthController {
  constructor(private readonly authService: AwsAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async login(@Body() authenticateRequest: { name: string, password: string }) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  // @Post('/register')
  // @ApiOperation({ summary: 'Register' })
  // signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   return this.authService.signUp(authCredentialsDto);
  // }

}
