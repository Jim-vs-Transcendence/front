import { ApiProperty } from '@nestjs/swagger';

export class twoFactorDTO {
  @ApiProperty({ description: 'Google Authentication OTP' })
  twoFactorAuthenticationCode: string;
}

export default twoFactorDTO;
