import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import RequestWithUser from '../interfaces/RequestWithUser.interface';
import twoFactorDTO from '../dto/twoFactor.dto';

@Controller('two-factor')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @Post('generate')
  async register(@Req() req: RequestWithUser, @Res() res: Response) {
    const { otpauthUrl } =
      await this.twoFactorService.generateTwoFactorAuthenticationSecret(
        req.user,
      );

    return this.twoFactorService.pipeQrCodeStream(res, otpauthUrl);
  }

  @Post('authentication')
  async authentication(
    @Req() req: RequestWithUser,
    @Body() twoFactorAuthenticationCode: twoFactorDTO,
  ) {
    const isCodeValidated =
      await this.twoFactorService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode.twoFactorAuthenticationCode,
        req.user,
      );

    if (isCodeValidated) console.log('Success!');
    else console.log('Fail!');
  }
}
