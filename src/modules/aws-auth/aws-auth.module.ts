import { Module } from '@nestjs/common';
import { AwsAuthService } from './aws-auth.service';
import { AwsAuthConfig } from './aws-auth.config';
import { AwsAuthController } from './aws-auth.controller';

@Module({
  providers: [AwsAuthService, AwsAuthConfig, AwsAuthService],
  controllers: [AwsAuthController]
})
export class AwsAuthModule {}
