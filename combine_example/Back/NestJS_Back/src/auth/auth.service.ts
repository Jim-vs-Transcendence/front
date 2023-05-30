import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor( private readonly usersService: UsersService ) {}

	async OAuthLogin({req, res})
	{
		// console.log(req);
		// console.log('-----------------');
		// console.log(res);
		// console.log(req.user);
		const userId = await this.usersService.findOne( req.user.id );

		if (!userId)
			await this.usersService.saveUser(req.user);

		// res.redirect("http://43.202.12.31:3002/about/" + req.user.id);
		res.redirect("http://43.202.12.31:3002/main");
	}
}
