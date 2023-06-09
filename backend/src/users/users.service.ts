import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Friend } from './entities/friend.entity';
import friendDTO from './friend/dto/friend.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Friend) private friendRepository: Repository<Friend>,
  ) {}

  // User part
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async updateUser(id: string, user: User): Promise<boolean> {
    await this.userRepository.update(id, user);
    return true;
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.userRepository.delete({ id: id });
    return true;
  }

  // Friend part

  // TODO cookie 완성되면 guard 만들어서 -> 완성

  // 실제 그 유저가 보낸 요청이 맞는지 확인해야 함
  async requestFriend(user_from: string, user_to: string) {
    // TODO
    this.friendRepository.find({});
  }

  async acceptFriend(user_from: string, user_to: string) {
    // TODO
  }

  // 친구인 User들을 list
  // 친구 신청 시에는 from이 to에 요청을 보내므로
  // user_to column 기준으로 내 id가 있는지 확인
  // async listFriends(id: string): Promise<friendDTO[]> {
  //   let ret: friendDTO;
  //   let friends = await this.friendRepository.find({
  //     where: {
  //       user_to: id,
  //     },
  //   });
  //   let user = await this.userRepository.find
  //   for (const friend of friends) {
  //     let tmp: userDTO {
  //       id: friend.user_from,
  //       avatar:
  //     }
  //     ret.push(tmp)
  //   }
  //   return ret;
  // }

  async blockFriend(user_from: string, user_to: string) {
    // TODO
  }
}
