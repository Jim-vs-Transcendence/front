// import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
// import { FriendsService } from './friend.service';
// import { FriendRequest } from '../entities/friendRequest.entity';
// import { Friendship } from '../entities/friendShip.entity';
// import { Block } from '../entities/block.entity';

// @Controller('friends')
// export class FriendsController {
//   constructor(private readonly friendsService: FriendsService) {}

//   // Send a friend request
//   @Post('requests')
//   sendFriendRequest(@Body() dto: SendFriendRequestDto): Promise<FriendRequest> {
//     return this.friendsService.sendFriendRequest(dto.senderId, dto.receiverId);
//   }

//   // Accept a friend request
//   @Post('requests/:requestId/accept')
//   acceptFriendRequest(
//     @Param('requestId') requestId: string,
//   ): Promise<Friendship> {
//     return this.friendsService.acceptFriendRequest(requestId);
//   }

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
// }
