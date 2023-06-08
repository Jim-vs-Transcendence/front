import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { toDataURL } from 'qrcode';
import { TokenService } from '../token/token.service';
import { Response } from 'express';

@Injectable()
export class TwoFactorService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenServiece: TokenService,
  ) {}

  async generateTwoFactorAuthenticationSecret(userId: string) {
    const secret = authenticator.generateSecret();

    const user: User = await this.userService.findOne(userId);

    user.two_factor_secret = secret;
    await this.userService.updateUser(userId, user);

    const otpauthUrl = await authenticator.keyuri(
      userId,
      process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
      secret,
    );

    return {
      secret,
      otpauthUrl,
    };
  }

  async QRtoDataURL(otpauthUrl: string): Promise<string> {
    return await toDataURL(otpauthUrl);
  }

  async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    userId: string,
  ) {
    const user: User = await this.userService.findOne(userId);
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.two_factor_secret,
    });
  }

  async twoFactorLogin(id: string, twoFactorAuthenticationCode: string) {
    const isCodeValidated = await this.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode,
      id,
    );

    if (isCodeValidated == true) await this.tokenServiece.createToken(id);

    return isCodeValidated;
    // if (isCodeValidated == false) res.send('false');
    // else {
    //   await this.tokenServiece.createToken(id);
    //   res.redirect('http://localhost:5173/auth/login/' + id);
    // res.location('http://localhost:5173/auth/login/' + id);
    // res.send('true');
    // }
  }

  // async deleteSecret(userId: string) : Promise<boolean> {
  //   const user: User = await this.userService.findOne(userId);

  //   user.two_factor = false;
  //   user.two_factor_secret = "";

  //   this.userService.updateUser(userId, user);

  // }
}
