import { Controller, Get, Headers, Param } from '@nestjs/common';
import { TokenService } from './token.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Controller('token')
export class TokenController {
	constructor(
		private readonly tokenService: TokenService,
		private readonly usersService: UsersService
	) {}


	// token이 유효할 때는 유저 정보를 반환해주고 유효하지 않은 토큰이 넘어오면 false

	@Get()
	async verifyToken(@Headers('authtoken') token: string): Promise<boolean | User> {
		const user = await this.tokenService.verifyToken(token);
		if (!user)
			return false;
		return await this.usersService.findOne(user.toString());
	}

	@Get(':id')
	async getToken(@Param('id') userId: string) : Promise<string | undefined> {
		const token = await this.tokenService.getToken(userId);
		return token;
	}
}
