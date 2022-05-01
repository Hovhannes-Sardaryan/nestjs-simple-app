import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  first_name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  last_name: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Password is too weak' })
  @MaxLength(32)
  password: string;
}
