import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { PassportStrategy } from "@nestjs/passport";
//import { Strategy } from "passport-42";
import { User } from "src/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Strategy } from 'passport-oauth2';

@Injectable()
export class auth42Strategy extends PassportStrategy( Strategy, '42' ) {
	constructor(
		private readonly configService: ConfigService,
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {
			// super({
		// 	clientID: configService.get<string>('CLIENT_ID'),
		// 	clientSecret: configService.get<string>('CLIENT_SECRET'),
		// 	callbackURL: configService.get<string>('CALLBACK_URL'),
		// 	profileFields: {
		// 		'id': 'id',
		// 		'email': 'email',
		// 		'nickname': 'login',
		// 		'avatar': 'image.link'
		// 	}
		// })
		super({
			authorizationURL: `https://api.intra.42.fr/oauth/authorize?
			  client_id=${configService.get<string>('CLIENT_ID')}&
			  redirect_uri=${configService.get<string>('CALLBACK_URL')}&
			  response_type=code`,
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			clientID: configService.get<string>('CLIENT_ID'),
			clientSecret: configService.get<string>('CLIENT_SECRET'),
			callbackURL: configService.get<string>('CALLBACK_URL'),
		});
	}

	// async validate(accessToken: string, refreshToken: string, profile: any, cb: any) {
	async validate(accessToken: string, refreshToken: string): Promise<any> {
		// console.log('accessToken: ', accessToken);
		// console.log('refreshToken: ', refreshToken);
		// console.log('profile: ', profile);
		// const user: User = {
		// 	id: profile.nickname,
		// 	nickname: profile.nickname,
		// 	email: profile.email,
		// 	avatar: profile.avatar,
		// 	win: 0,
		// 	lose: 0,
		// 	level: 0,
		// 	user_status: 0
		// }
		const { data } = await axios.get('https://api.intra.42.fr/v2/me', {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		
		const user = this.userRepository.create({
			id: data.login,
			nickname: data.login,
			email: data.email,
			avatar: data.image.link,
			win: 0,
			lose: 0,
			level: 0,
			user_status: 0,
		});
	
		await this.userRepository.save(user);

		console.log(user);

		// cb(null, user); 이거 대체재 뭐임?
	}
}
