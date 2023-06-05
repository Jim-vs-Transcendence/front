import { Controller, Post, Req, Res } from '@nestjs/common';
import { TwoFactorService } from './two-factor.service';
import RequestWithUser from '../interfaces/RequestWithUser.interface';

@Controller('two-factor')
export class TwoFactorController {
	constructor (
		private readonly twoFactorService: TwoFactorService
	) {}

	@Post('generate')
	async register(@Req() req: RequestWithUser, @Res() res: Response)
	{
		const { otpauthUrl } = await this.twoFactorService.generateTwoFactorAuthenticationSecret(req.user);

		return this.twoFactorService.pipeQrCodeStream(res, otpauthUrl);
	}
}
