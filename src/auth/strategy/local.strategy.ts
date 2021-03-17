import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Client } from 'src/clients/client.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<Client> {
    const result = await this.authService.validateClient(email, password);
    if (!result.client) {
      throw new UnauthorizedException();
    }
    return result.client;
  }
}