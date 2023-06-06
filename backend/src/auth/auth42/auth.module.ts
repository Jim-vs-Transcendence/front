import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { auth42Strategy } from './auth42.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../token/token.service';
import { Friend } from 'src/users/entities/friend.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: '42' }),
    TypeOrmModule.forFeature([User, Friend]),
  ],
  controllers: [AuthController],
  providers: [AuthService, auth42Strategy, UsersService, TokenService],
})
export class AuthModule {}
