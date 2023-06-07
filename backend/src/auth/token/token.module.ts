import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Friend } from 'src/users/entities/friend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Friend])],
  controllers: [TokenController],
  providers: [TokenService, UsersService],
})
export class TokenModule {}
