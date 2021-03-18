import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from 'src/clients/client.service';
import { ClientType } from 'src/clients/dto/client.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly ClientService: ClientService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {name: string, sub: number}) {
    const client = this.ClientService.getClientById(payload.sub);

    if(!client){
      throw new UnauthorizedException('Unauthorized');
    }

    return client;
  }
}