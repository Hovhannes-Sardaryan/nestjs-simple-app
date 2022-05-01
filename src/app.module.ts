import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import { BootstrapTypeormModule } from './bootstrap/typeorm.module';
import { BootstrapConfigModule } from './bootstrap/config.module';
import { ConfigService } from '@nestjs/config';
import { AuthUserMiddleware } from './common/middlewares/auth-user.middleware';

@Module({
  imports: [
    TasksModule,
    BootstrapConfigModule,
    BootstrapTypeormModule,
    AuthModule,
  ],
  // controllers: [],
  providers: [ConfigService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    return consumer
      .apply(AuthUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
