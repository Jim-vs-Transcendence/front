import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Friend, FriendRequestStatus } from '../entities/friend.entity';
import friendDTO from './dto/friend.dto';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
  ) {}

  // Find a friend request
  async findFriend(user_to: string) {
    const friendEntities = await this.friendRepository.find({
      where: { user_to: user_to },
    });

    const ret: friendDTO[] = await Promise.all(
      friendEntities.map(async (friend) => {
        const userFrom = await this.usersRepository.findOne({
          where: { id: friend.user_from },
        });

        if (!userFrom) {
          throw new NotFoundException(
            `User with id ${friend.user_from} not found`,
          );
        }

        return {
          id: friend.user_from,
          nickname: userFrom.nickname,
          avatar: userFrom.avatar,
          status: userFrom.user_status,
          friendStatus: friend.friend_status,
        };
      }),
    );

    return ret;
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
  async acceptFriendRequest(
    user_to: string,
    user_from: string,
  ): Promise<boolean> {
    const request = await this.friendRepository.findOne({
      where: {
        user_to: user_to,
        user_from: user_from,
      },
    });

    if (!request) {
      throw new NotFoundException('Friend request not found');
    }
    if (request.friend_status !== FriendRequestStatus.PENDING) {
      throw new BadRequestException('Friend request is not pending');
    }

    request.friend_status = FriendRequestStatus.ACCEPTED;
    const user = await this.usersRepository.findOne({ where: { id: user_to } });
    await this.friendRepository.save(request);

    const friendship = this.friendRepository.create({
      user_from: user_to,
      user_to: user_from,
      friend_status: FriendRequestStatus.ACCEPTED,
    });
    await this.friendRepository.save(friendship);

    return true;
  }

  async deleteFriend(user_from: string, user_to: string): Promise<boolean> {
    // Fetch the friend entities from the database
    const friendEntities = await this.friendRepository.find({
      where: [
        { user_from: user_to, user_to: user_from },
        { user_from: user_from, user_to: user_to },
      ],
    });

    // If no entities are found, throw an error
    if (friendEntities.length < 1) {
      throw new NotFoundException(
        `Complete friend relationship between users ${user_from} and ${user_to} not found`,
      );
    }

    // If found, remove(delete) the entities from the database
    await this.friendRepository.delete(friendEntities[0]);
    if (friendEntities.length > 1)
      await this.friendRepository.delete(friendEntities[1]);

    return true;
  }

  // // Block a user
  // async blockUser(blockerId: string, blockedId: string): Promise<Block> {
  //   const block = this.blockRepository.create({ blockerId, blockedId });
  //   return this.blockRepository.save(block);
  // }
}
