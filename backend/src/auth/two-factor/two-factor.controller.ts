import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import RequestWithUser from '../interfaces/RequestWithUser.interface';
import twoFactorDTO from './two-factor.dto';
import { TokenGuard } from '../token/token.guard';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('two-factor')
@ApiTags('Two-Factor API')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @Post('generate')
  @UseGuards(TokenGuard)
  @ApiOperation({
    summary: 'Google Authentication QRcode 생성 API',
    description: 'Google Authentication QRcode 생성해줍니다.',
  })
  @ApiCreatedResponse({
    description: '생성된 Google Authentication QRcode를 반환해줍니다.',
  })
  async register(@Req() req: RequestWithUser): Promise<string> {
    const { otpauthUrl } =
      await this.twoFactorService.generateTwoFactorAuthenticationSecret(
        req.user.toString(),
      );

    return await this.twoFactorService.QRtoDataURL(otpauthUrl);
  }

  @Post('authentication/:id')
  @ApiOperation({
    summary: 'Google Authentication OTP 인증 API',
    description: '사용자의 Google Authentication OTP가 유효한지 확인해줍니다.',
  })
  @ApiCreatedResponse({
    description:
      '사용자의 Google Authentication OTP 유효성 검사 후 성공여부를 boolean값으로 반환해줍니다.',
    type: Boolean,
  })
  async authentication(
    @Param('id') id: string,
    @Body() twoFactorAuthenticationCode: twoFactorDTO,
    // @Res() res: Response,
  ) {
    // await this.twoFactorService.twoFactorLogin(
    return await this.twoFactorService.twoFactorLogin(
      // res,
      id,
      twoFactorAuthenticationCode.twoFactorAuthenticationCode,
    );
  }

  @Post('init_authentication/:id')
  async init_authentication(
    @Param('id') id: string,
    @Body() twoFactorAuthenticationCode: twoFactorDTO,
  ) {
    return await this.twoFactorService.isTwoFactorAuthenticationCodeValid(
      id,
      twoFactorAuthenticationCode.twoFactorAuthenticationCode,
    );
  }
}
