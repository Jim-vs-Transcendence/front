import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FriendsService } from './friend.service';
import { Friend } from '../entities/friend.entity'
import { TokenGuard } from 'src/auth/token/token.guard';
import { SendFriendRequestDTO } from './dto/sendFriendRequest.dto';
import friendDTO from './dto/friend.dto';
import RequestWithUser from 'src/auth/interfaces/RequestWithUser.interface';

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

//   // Delete a friend
//   @Delete(':friendId')
//   deleteFriend(
//     @User('id') userId: string,
//     @Param('friendId') friendId: string,
//   ): Promise<void> {
//     return this.friendsService.deleteFriend(userId, friendId);
//   }

//   // Block a user
//   @Post('blocks')
//   blockUser(@Body() dto: BlockUserDto): Promise<Block> {
//     return this.friendsService.blockUser(dto.blockerId, dto.blockedId);
//   }
}
