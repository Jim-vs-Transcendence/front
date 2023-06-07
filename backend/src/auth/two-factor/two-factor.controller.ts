import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import RequestWithUser from '../interfaces/RequestWithUser.interface';
import twoFactorDTO from './two-factor.dto';
import { TokenGuard } from '../token/token.guard';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('two-factor')
@ApiTags('Two-Factor API')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Google Authentication QRcode 생성 API',
    description: 'Google Authentication QRcode 생성해줍니다.',
  })
  @ApiCreatedResponse({
    description: '생성된 Google Authentication QRcode를 반환해줍니다.',
  })
  @UseGuards(TokenGuard)
  async register(@Req() req: RequestWithUser): Promise<string> {
    const { otpauthUrl } =
      await this.twoFactorService.generateTwoFactorAuthenticationSecret(
        req.user.toString(),
      );

    return await this.twoFactorService.pipeQrCodeStream(otpauthUrl);
  }

  @Post('authentication')
  @ApiOperation({
    summary: 'Google Authentication OTP 인증 API',
    description: '사용자의 Google Authentication OTP가 유효한지 확인해줍니다.',
  })
  @ApiCreatedResponse({
    description:
      '사용자의 Google Authentication OTP 유효성 검사 후 성공여부를 boolean값으로 반환해줍니다.',
    type: Boolean,
  })
  @UseGuards(TokenGuard)
  async authentication(
    @Req() req: RequestWithUser,
    @Body() twoFactorAuthenticationCode: twoFactorDTO,
  ) {
    const isCodeValidated =
      await this.twoFactorService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode.twoFactorAuthenticationCode,
        req.user.toString(),
      );

    return isCodeValidated;
  }

  // @Get('turn-on')
  // async getSecret(userId: string) : Promise<boolean> {
  //   return this.twoFactorService.deleteSecret(userId);
  // }

  // @Get('turn-off')
  // async deleteSecret(userId: string) : Promise<boolean> {
  //   return this.twoFactorService.deleteSecret(userId);
  // }
}
