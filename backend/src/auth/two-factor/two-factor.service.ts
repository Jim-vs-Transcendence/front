import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { toFileStream } from 'qrcode';

@Injectable()
export class TwoFactorService {
  constructor(private readonly userService: UsersService) {}

  async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();

    console.log(secret);

    const tmpUser: User = await this.userService.findOne('dhyun');

    tmpUser.two_factor_secret = secret;
    this.userService.updateUser('dhyun', tmpUser);

    const otpauthUrl = authenticator.keyuri(
      'dhyun',
      process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
      secret,
    );

    return {
      secret,
      otpauthUrl,
    };
  }

  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }

  async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: User,
  ) {
    const tmpUser: User = await this.userService.findOne('dhyun');
    console.log(tmpUser);
    console.log(twoFactorAuthenticationCode);
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: tmpUser.two_factor_secret,
    });
  }
}
