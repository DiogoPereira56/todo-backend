import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from 'src/clients/client.service';
import { Request } from 'express';

const cookieExtractor = function (req: Request) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.token;
    }
    return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly clientService: ClientService) {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    /**
     * Receives an id from a client and checks if he exists
     *
     * @param  payload - An object with a client's name and a id
     *
     * @return {Client} - An object representing a client
     *
     * @example
     *
     *     validate(payload);
     */
    async validate(payload: { name: string; id: number }) {
        const client = this.clientService.getClientById(payload.id);

        if (!client) {
            throw new UnauthorizedException('Unauthorized');
        }
        //console.log('it is passing through jwt strategy');
        return client;
    }
}
