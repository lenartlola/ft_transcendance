
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { LoggedUserDto } from '../dto/logged_user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<LoggedUserDto> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('User validation error');
    }
    return user;
  }
}