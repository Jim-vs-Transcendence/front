import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly tokenService: TokenService
	) {}

	async OAuthLogin({req, res}) {
		const userId = await this.usersService.findOne( req.user.id );

		if (!userId)
			await this.usersService.saveUser(req.user);

		await this.tokenService.createToken(req.user.id);

		res.redirect("http://localhost:5173/auth/" + req.user.id);
		// res.redirect("http://43.202.12.31:3002/main");
	}
}
