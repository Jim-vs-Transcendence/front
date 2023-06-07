// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../entities/user.entity';
// import {
//   FriendRequest,
//   FriendRequestStatus,
// } from '../entities/friendRequest.entity';
// import { Friendship } from '../entities/friendShip.entity';
// import { Block } from '../entities/block.entity';

// @Injectable()
// export class FriendsService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//     @InjectRepository(FriendRequest)
//     private friendRequestRepository: Repository<FriendRequest>,
//     @InjectRepository(Friendship)
//     private friendshipRepository: Repository<Friendship>,
//     @InjectRepository(Block)
//     private blockRepository: Repository<Block>,
//   ) {}

//   // Send a friend request
//   async sendFriendRequest(
//     senderId: string,
//     receiverId: string,
//   ): Promise<FriendRequest> {
//     const friendRequest = this.friendRequestRepository.create({
//       senderId,
//       receiverId,
//     });
//     return this.friendRequestRepository.save(friendRequest);
//   }

//   // Accept a friend request
//   async acceptFriendRequest(requestId: string): Promise<Friendship> {
//     const request = await this.friendRequestRepository.findOne({
//       where: { id: requestId },
//     });
//     if (!request) {
//       throw new NotFoundException('Friend request not found');
//     }
//     if (request.status !== FriendRequestStatus.PENDING) {
//       throw new BadRequestException('Friend request is not pending');
//     }

//     request.status = FriendRequestStatus.ACCEPTED;
//     await this.friendRequestRepository.save(request);

//     const friendship = this.friendshipRepository.create({
//       userId1: request.senderId,
//       userId2: request.receiverId,
//     });
//     return this.friendshipRepository.save(friendship);
//   }

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
// }
