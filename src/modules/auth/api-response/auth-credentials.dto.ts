import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(7)
  @MaxLength(32)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
