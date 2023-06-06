import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Friend } from './entities/friend.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Friend) private friendRepository: Repository<Friend>,
  ) {}

  // User part
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async updateUser(id: string, user: User): Promise<string> {
    await this.userRepository.update(id, user);
    return 'Successfully update!';
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<string> {
    await this.userRepository.delete({ id: id });
    return 'Successfully delete!';
  }

  // Friend part

  // TODO cookie 완성되면 guard 만들어서
  // 실제 그 유저가 보낸 요청이 맞는지 확인해야 함
  requestFriend(user_from: string, user_to: string) {
    // TODO
  }

  acceptFriend(user_from: string, user_to: string) {
    // TODO
  }

  // 친구인 User들을 list
  // 2번 to column 기준으로 내 id가 있는지 확인
  listFriends(id: string) {
    return this.friendRepository.
    // TODO
  }

  blockFriend(user_from: string, user_to: string) {
    // TODO
  }
}
