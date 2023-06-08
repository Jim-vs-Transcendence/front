import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../token/token.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login({ req, res }) {
    let user = await this.usersService.findOne(req.user.id);

    if (!user) user = await this.usersService.saveUser(req.user);

    const token = await this.tokenService.createToken(req.user.id);
    // res.setHeader('authToken', token);
    // res.cookie('authToken', token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    // });

    user = await this.usersService.findOne(req.user.id);
    user.user_status = 1;

    await this.usersService.updateUser(user.id, user);

    if (user.two_factor == true)
      res.redirect('http://localhost:5173/auth/two/' + user.id);
    else res.redirect('http://localhost:5173/auth/login/' + user.id);
    // res.redirect('http://localhost:5173/main');
    // res.redirect('http://localhost:3002/main');
  }

  async logout(token: string) {
    const userId = this.tokenService.verifyToken(token);

    await this.tokenService.deleteToken((await userId).toString());

    const user: User = await this.usersService.findOne(
      (await userId).toString(),
    );
    user.user_status = 0;
    await this.usersService.updateUser((await userId).toString(), user);
  }
}
