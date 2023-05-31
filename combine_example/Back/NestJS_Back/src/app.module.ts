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
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot((typeORMConfig)),
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
