import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { toFileStream } from 'qrcode';

@Injectable()
export class TwoFactorService {
  constructor(private readonly userService: UsersService) {}

  async generateTwoFactorAuthenticationSecret(userId: string) {
    const secret = authenticator.generateSecret();

    console.log(secret);

    const user: User = await this.userService.findOne(userId);

    user.two_factor_secret = secret;
    this.userService.updateUser(userId, user);

    const otpauthUrl = authenticator.keyuri(
      userId,
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
    userId: string,
  ) {
    const user: User = await this.userService.findOne(userId);
    console.log(user);
    console.log(twoFactorAuthenticationCode);
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.two_factor_secret,
    });
  }

  // async deleteSecret(userId: string) : Promise<boolean> {
  //   const user: User = await this.userService.findOne(userId);

  //   user.two_factor = false;
  //   user.two_factor_secret = "";

  //   this.userService.updateUser(userId, user);

  // }
}
