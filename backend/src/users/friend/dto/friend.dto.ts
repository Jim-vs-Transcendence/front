import { FriendRequestStatus } from "src/users/entities/friend.entity";

export class friendDTO {
  id: string;
  nickname: string;
  avatar: string;
  status: number;
  friendStatus: FriendRequestStatus;
}

export default friendDTO;
