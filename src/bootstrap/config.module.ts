import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import schema from 'config/schema';
import configs from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configs],
      isGlobal: true,
      validationSchema: schema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      expandVariables: true,
    }),
  ],
})
export class BootstrapConfigModule {}
