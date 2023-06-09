import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friend.service';
import RequestWithUser from 'src/auth/interfaces/RequestWithUser.interface';
import SendFriendRequestDTO from './dto/sendFriendRequest.dto';
import friendDTO from './dto/friend.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/token/token.guard';

@Controller('friends')
@UseGuards(TokenGuard)
@ApiTags('친구 관련 API')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  @ApiOperation({
    summary: '친구 목록 조회 API',
    description: '현재 친구 목록을 불러옵니다.',
  })
  findFriend(@Req() req: RequestWithUser): Promise<friendDTO[]> {
    return this.friendsService.findFriend(req.user);
  }

  // Send a friend request
  @Post('requests')
  @ApiOperation({
    summary: '친구 요청 API',
    description: '친구 요청을 해줍니다.',
  })
  sendFriendRequest(
    @Req() req: RequestWithUser,
    @Body() dto: SendFriendRequestDTO,
  ): Promise<boolean> {
    console.log('request!');
    return this.friendsService.sendFriendRequest(req.user, dto.user_to);
  }

  // Accept a friend request
  @Post('requests/:user_from/accept')
  @ApiOperation({
    summary: '친구 요청 수락 API',
    description: '친구 요청을 수락해줍니다.',
  })
  acceptFriendRequest(
    @Req() req: RequestWithUser,
    @Param('user_from') user_from: string,
  ): Promise<boolean> {
    return this.friendsService.acceptFriendRequest(req.user, user_from);
  }

  // Delete a friend
  @Delete(':user_to')
  @ApiOperation({
    summary: '친구 삭제 API',
    description: '친구를 삭제합니다.',
  })
  deleteFriend(
    @Req() req: RequestWithUser,
    @Param('user_to') user_to: string,
  ): Promise<boolean> {
    return this.friendsService.deleteFriend(req.user, user_to);
  }

  // // Block a user
  // @Post('blocks')
  // blockUser(@Body() dto: BlockUserDto): Promise<Block> {
  //   return this.friendsService.blockUser(dto.blockerId, dto.blockedId);
  // }
}
