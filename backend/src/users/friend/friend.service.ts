import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Friend } from '../entities/friend.entity';
import { FriendRequestStatus } from '../entities/friend.entity';
import { friendDTO } from './dto/friend.dto'

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
  ) {}

//     async findFriend(user_to: string) {
//     const user = await this.usersRepository.findOne({
//         where: { id: user_to },
//         relations: ['receivedRequests', 'receivedRequests.user_from'],
//     });

//     const ret: friendDTO[] = user.receivedRequests.map(friend => ({
//         id: friend.user_from.id,
//         nickname: friend.user_from.nickname,
//         avatar: friend.user_from.avatar,
//         status: friend.user_from.user_status,
//         friendStatus: friend.friend_status,
//     }));

//     return ret;
// }
  async findFriend(user_to: string) {
//     const friends = await this.friendRepository.find({
//         where: { user_to: user_to },
//         relations: ['user'],  // This tells TypeORM to also retrieve related User entities
//     });

//     const ret: friendDTO[] = await friends.map(friend => ({
//         id: friend.user_to,
//         nickname: friend.user.nickname,
//         avatar: friend.user.avatar,
//         status: friend.user.user_status,
//         friendStatus: friend.friend_status,
//     }));

//     return ret;
// }

    let ret: friendDTO[];
    const friends = await this.friendRepository.find({
      where: { user_to: user_to, },
    });


    for (const friend of friends) {
      const user = await this.usersRepository.findOne({where: {id: friend.user_from}})

      const tmp: friendDTO = {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        status: user.user_status,
        friendStatus: friend.friend_status,
      }

      ret.push(tmp);
    }
   return ret;
    
    // return true;
 }

  // Send a friend request
  async sendFriendRequest(
    user_from: string,
    user_to: string,
  ): Promise<boolean> {
    const friendRequest = this.friendRepository.create({
      user_from,
      user_to,
      });
    this.friendRepository.save(friendRequest);
    return true;
  }

  // Accept a friend request
  async acceptFriendRequest(user_to: string, user_from: string): Promise<boolean> {
    const request = await this.friendRepository.findOne({
      where: { 
        user_to: user_to,
        user_from: user_from
      },
    });

    if (!request) {
      throw new NotFoundException('Friend request not found');
    }
    if (request.friend_status !== FriendRequestStatus.PENDING) {
      throw new BadRequestException('Friend request is not pending');
    }

    request.friend_status = FriendRequestStatus.ACCEPTED;
    const user = await this.usersRepository.findOne({ where: {id: user_to}});
    await this.friendRepository.save(request);

    const friendship = this.friendRepository.create({
        user_from: user_to,
        user_to: user_from,
        friend_status: FriendRequestStatus.ACCEPTED,
    });
    await this.friendRepository.save(friendship);

    return true;
  }

//   // Delete a friend
//   async deleteFriend(userId: string, friendId: string): Promise<void> {
//     const friendship = await this.friendshipRepository.findOne({
//       where: [
//         { userId1: userId, userId2: friendId },
//         { userId1: friendId, userId2: userId },
//       ],
//     });
//     if (!friendship) {
//       throw new NotFoundException('Friendship not found');
//     }
//     await this.friendshipRepository.delete(friendship.id);
//   }

//   // Block a user
//   async blockUser(blockerId: string, blockedId: string): Promise<Block> {
//     const block = this.blockRepository.create({ blockerId, blockedId });
//     return this.blockRepository.save(block);
//   }
}
