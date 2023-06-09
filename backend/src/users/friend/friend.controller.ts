import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friend.service';
import { Friend } from '../entities/friend.entity'
import { TokenGuard } from 'src/auth/token/token.guard';
import { SendFriendRequestDTO } from './dto/sendFriendRequest.dto';
import friendDTO from './dto/friend.dto';
import RequestWithUser from 'src/auth/interfaces/RequestWithUser.interface';
import { User } from '../entities/user.entity';

@Controller('friends')
@UseGuards(TokenGuard)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  findFriend(@Req() req: RequestWithUser): Promise<friendDTO[]> {
    return this.friendsService.findFriend(req.user);
  }

  // Send a friend request
  @Post('requests')
  sendFriendRequest(@Req() req: RequestWithUser, @Body() dto: SendFriendRequestDTO): Promise<boolean> {
    console.log('request!');
    return this.friendsService.sendFriendRequest(req.user, dto.user_to);
  }

  // Accept a friend request
  @Post('requests/:user_from/accept')
  acceptFriendRequest(@Req() req: RequestWithUser, @Param('user_from') user_from: string): Promise<boolean> {
    return this.friendsService.acceptFriendRequest(req.user, user_from);
  }

  // Delete a friend
  @Delete(':user_from')
  deleteFriend(@Req() req: RequestWithUser, @Param('user_to') user_to: string): Promise<boolean> {
    return this.friendsService.deleteFriend(req.user, user_to);
  }

  // Block a user
  @Post('blocks/:user_to')
  blockUser(@Req() req: RequestWithUser, @Param('user_to') user_to: string): Promise<boolean> {
    return this.friendsService.blockUser(req.user, user_to);
  }
}
