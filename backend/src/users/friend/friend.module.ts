import { Module } from '@nestjs/common';
import { FriendsService } from './friend.service';
import { FriendsController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
import { Friend } from '../entities/friend.entity';
import { TokenService } from 'src/auth/token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friend])],
  providers: [FriendsService, UsersService, TokenService],
  controllers: [FriendsController],
})
export class FriendModule {}
