import { ApiProperty } from '@nestjs/swagger';

export class SendFriendRequestDTO {
  @ApiProperty({ description: '요청을 보낼 친구의 id' })
  user_to: string;
}

export default SendFriendRequestDTO;
