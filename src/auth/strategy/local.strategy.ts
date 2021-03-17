import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Clients } from 'src/clients/clients.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<Clients> {
    const result = await this.authService.validateClient(email, password);
    if (!result.client) {
      throw new UnauthorizedException();
    }
    return result.client;
  }
}