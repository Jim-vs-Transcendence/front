import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { toFileStream } from 'qrcode';

@Injectable()
export class TwoFactorService {
	constructor(
		private readonly userService: UsersService
	) {}

	async generateTwoFactorAuthenticationSecret(user: User) {
		const secret = authenticator.generateSecret();

		console.log(secret);

		const tmpUser = {
			"id": "dhyun",
			"nickname": "dhyun",
			"email": "dhyun@student.42seoul.kr",
			"avatar": "https://cdn.intra.42.fr/users/16be1203bb548bd66ed209191ff6d30d/dhyun.jpg",
			"win": 0,
			"lose": 0,
			"level": 0,
			"user_status": 1,
			"two_factor": true,
			"two_factor_secret": secret
		}

		this.userService.updateUser('dhyun', tmpUser);

		const otpauthUrl = authenticator.keyuri("dhyun",
			process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME, secret);

		return {
			secret,
			otpauthUrl,
		}
	}

	async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
		return toFileStream(stream, otpauthUrl);
	}
}
