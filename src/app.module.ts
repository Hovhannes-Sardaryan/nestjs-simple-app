import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
// import { BootstrapTypeormModule } from './bootstrap/typeorm.module';
import { BootstrapConfigModule } from './bootstrap/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    BootstrapConfigModule,
    // BootstrapTypeormModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.HOST,
      port: parseInt(process.env.POSTGRES_DB_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,

      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  // controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
