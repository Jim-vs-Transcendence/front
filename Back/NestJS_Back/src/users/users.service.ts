import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

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
		console.log(user);
		return "Successfully update!";
	}

	async saveUser(user: User): Promise<string> {
		await this.userRepository.save(user);
		return "Successfully save!";
	}

	async deleteUser(id: string): Promise<string> {
		await this.userRepository.delete({id: id});
		return "Successfully delete!";
	}
}
