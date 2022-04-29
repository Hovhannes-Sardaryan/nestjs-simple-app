import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  first_name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  last_name: string;

  @IsString()
  @MinLength(8, { message: 'Password is too weak' })
  @MaxLength(32)
  password: string;
}
