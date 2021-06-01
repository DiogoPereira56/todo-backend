import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from '../clients/client.model';
import { ClientService } from '../clients/client.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { decodedToken } from './dto/decoded.token';
import { ListOfTasksService } from '../Lists/list.service';

@Injectable()
export class AuthService {
    constructor(
        private clientService: ClientService,
        private listOfTasksService: ListOfTasksService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    /**
     * Takes an email and password, checks if Client exists and if the password is correct, then gives them a JWT Token
     *
     * @param {string} email - A client's email
     * @param {string} password - A client's password
     * @param {Response} res - A POST's response
     *
     * @return {Boolean} - Returns true if client was validated, or false if it wasn't
     *
     * @example
     *
     *     validateClient(client.email, client.password);
     */
    async validateClient(email: string, password: string, res: Response): Promise<boolean> {
        const client = await this.clientService.getOneClient(email);

        if (client && (await bcrypt.compare(password, client.password))) {
            const token = await this.giveJwtToken(client);
            res.cookie('token', token);

            /* console.log(this.jwtService.decode(token)); */
            //console.log(token + '\n');
            //console.log(client.name + ' just logged in :D ');
            return true;
        }
        return false;
    }

    /**
     * Takes the Request from a POST, decodes the JWT cookie and returns the decoded version if valid, if not, returns 'invalid'
     *
     * @param {Request} req - A POST's Request
     *
     * @return {String | { [key: string]: string; }} - Returns a decoded JTW token, or 'invalid'
     *
     * @example decodeToken(ctx.req);
     *
     */
    async decodeToken(req: Request): Promise<decodedToken> {
        /* const decoded = this.jwtService.decode(req.cookies.token); */
        const decoded = this.jwtService.verify(
            req.cookies.token,
            this.config.get('BCRYPT_SALT'),
        ) as decodedToken;

        /* console.log('\n' + req.cookies.token + '\n'); */
        /* console.log(decoded.id); */
        /* console.log(decoded); */

        return decoded;
    }

    /**
     * Gives a Token to a Client
     *
     * @param {Client} client - Represents a client
     *
     * @return {string} - Returns a newly formed client's JWT Token
     *
     * @example
     *
     *     giveJwtToken(client)
     */
    async giveJwtToken(client: Client): Promise<string> {
        const payload = { name: client.name, id: client.idClient };
        return this.jwtService.sign(payload);
    }

    async invalidateToken(res: Response): Promise<string> {
        res.cookie('token', 'invalid');
        return 'cookie removed';
    }

    /**
     *  Creates a new List, returns true if successfull, false if not
     *
     *  @param {string} listName - A new Lists's name
     *
     *  @returns {Boolean} - returns true if List was created, false if it didn't
     *
     *  @example createList(listName, idClient);
     */
    async createList(listName: string, req: Request): Promise<boolean> {
        const decodedToken = await this.decodeToken(req);

        this.listOfTasksService.createList(listName, decodedToken.id);

        return true;
    }
}
