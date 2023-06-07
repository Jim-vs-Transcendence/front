import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class auth42Strategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('CLIENT_ID'),
      clientSecret: configService.get<string>('CLIENT_SECRET'),
      callbackURL: configService.get<string>('CALLBACK_URL'),
      profileFields: {
        id: 'id',
        email: 'email',
        nickname: 'login',
        avatar: 'image.link',
      },
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: any,
  ) {
    const user: User = {
      id: profile.nickname,
      nickname: profile.nickname,
      email: profile.email,
      avatar: profile.avatar,
      win: 0,
      lose: 0,
      level: 0,
      user_status: 0,
      two_factor: false,
      two_factor_secret: 'none',
    };
    // console.log(user);
    cb(null, user);
  }
}
