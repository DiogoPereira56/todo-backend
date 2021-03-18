import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from 'src/clients/client.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly ClientService: ClientService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /** Receives an id from a client and checks if he exists
   *
   * @param  payload - An object with a client's name and a id 
   * 
   * @return {Client} - An object representing a client
   *
   * @example
   *
   *     validate(payload);
   */
  async validate(payload: {name: string, sub: number}) {
    const client = this.ClientService.getClientById(payload.sub);

    if(!client){
      throw new UnauthorizedException('Unauthorized');
    }

    return client;
  }
}