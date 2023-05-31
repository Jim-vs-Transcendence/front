import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { tokenDTO } from './DTO/token.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	private token1: tokenDTO = {
		authToken: "qwer1234",
	}
	private token: tokenDTO[] = [
		this.token1,
	];

	findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	findOne(id: string) {
		return this.userRepository.findOne({ where: {id: id} });
	}

	async updateUser(id: string, user: User): Promise<string> {
		await this.userRepository.update(
			id,
			user
		);
		return user.id;
	}

	async saveUser(user: User): Promise<string> {
		await this.userRepository.save(user);
		return user.id;
	}

	async deleteUser(id: string): Promise<string> {
		await this.userRepository.delete({id: id});
		return "Successfully delete!";
	}

	async getToken(): Promise<tokenDTO> {
		return this.token1;
	}
}

// @Injectable()
// export class UsersService {
// 	private users: User =
// {
// 	id: 'dhyun',
// 	nickname: 'dhyun',
// 	email: 'dhyun@student.42seoul.kr',
// 	avatar: 'https://cdn.intra.42.fr/users/16be1203bb548bd66ed209191ff6d30d/dhyun.jpg',
// 	win: 0,
// 	lose: 0,
// 	level: 0,
// 	user_status: 0
// }

// 	//   async findOne(intra_email: string): Promise<User | undefined> {
// 	// 	return this.users.find(user => user.intra_email === intra_email);
// 	//   }
// 	  async getUser() {
// 		// console.log(this.users);
// 		return this.users[0];
// 	  }
// }
