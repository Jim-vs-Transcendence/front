import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // +를 붙여 int형으로 변환
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNC === 'true',
      logging: process.env.DB_LOG === 'true',
      entities: [User]
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService
  ],
})
export class AppModule {}
