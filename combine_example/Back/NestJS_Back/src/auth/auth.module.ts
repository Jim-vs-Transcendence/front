import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { auth42Strategy } from './auth42.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: '42'}),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    auth42Strategy,
    UsersService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
