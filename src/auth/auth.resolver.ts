import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { Client } from 'src/clients/client.model';
import { ClientService } from 'src/clients/client.service';
import { ClientLoginInput } from 'src/clients/dto/client.login';
import { ClientRegisterInput } from 'src/clients/dto/client.register';
import { CurrentClient } from './auth.currentClient';
import { GqlAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { decodedToken } from './dto/decoded.token';

@Resolver('Auth')
export class AuthResolver {
    constructor(private authService: AuthService, private clientService: ClientService) {}

    /**
     * Takes an Email and Password, validates them, and returns the client with a JWT Token
     * Also stores the JWT Token in a cookie
     *
     *  @param {string} email - A string representing an email
     *  @param {string} password - A string representing a password
     *
     *  @returns {Boolean} Returns true if client was validated, or false if it wasn't
     *
     *  @example
     *      mutation{
     *          login(
     *              email:"teste@hotmail.com",
     *              password:"pass"
     *          ) {
     *              client{
     *              idClient
     *              name
     *              email
     *              }
     *              token
     *          }
     *      }
     */
    @Mutation(() => Boolean)
    public async login(
        @Args() clientInput: ClientLoginInput,
        @Context() ctx: { res: Response; req: Request },
    ) {
        const validated = await this.authService.validateClient(
            clientInput.email,
            clientInput.password,
            ctx.res,
        );

        return validated;
    }

    /** 
     * Takes a Client and registers them onto the DataBase

        @param {string} name - A string representing a name
        @param {string} email - A string representing an email
        @param {string} password - A string representing a password

        @returns {Boolean} Returns true if client was created, false if it didn't

        @example
            mutation{
                register(
                    input: {
                    name: "fernanda5"
                    email: "fernanda5@hotmail.com"
                    password: "p123"
                    }
                ){
                    idClient
                    name
                }
            }
    */
    @Mutation(() => Boolean)
    public async register(@Args() clientInput: ClientRegisterInput) {
        return this.clientService.createClient(clientInput.name, clientInput.email, clientInput.password);
    }

    /**
     *  Changes the JWT cookie to 'invalid' to invalidate the cookie
     *
     *  @param {Context} ctx - A POST's Context
     *
     *  @returns {String} Returns 'cookie removed'
     *
     *  @example
     *      {
     *          removeToken
     *      }
     */
    @UseGuards(GqlAuthGuard)
    @Query(() => String)
    public async removeToken(@Context() ctx: { res: Response; req: Request }) {
        ctx.res.cookie('token', 'invalid');
        console.log('\n cookie removed');
        return 'cookie removed';
    }

    /**
     *  Receives a POST context, decodes a JWT cookie, and returns it's values
     *
     *  @param {Context} ctx - A POST's Context
     *
     *  @returns {decodedToken} Returns a decoded JWT Token
     *
     *  @example
     *      {
     *          getDecodedToken{
     *              id
     *              name
     *          }
     *      }
     */
    @UseGuards(GqlAuthGuard)
    @Query(() => decodedToken)
    public async getDecodedToken(@Context() ctx: { res: Response; req: Request }) {
        /* this.authService.checkTimedOut(ctx.req); */
        /* console.log(JSON.stringify(ctx.req.cookies.token) ); */
        /* console.log(this.jwtService.decode(token)); */

        return this.authService.decodeToken(ctx.req);
    }

    /**
     *  Registers a new List onto the DataBase
     *
     *  @param {newList} name - A string representing a name
     *
     * @returns {Boolean} Returns true if List was created, false if it didn't
     *
     * @example
     *
     */
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    public async addList2(
        @Args('listName') listName: string,
        @Context() ctx: { res: Response; req: Request },
    ) {
        return this.authService.createList(listName, ctx.req);
    }

    @Query(() => Client)
    @UseGuards(GqlAuthGuard)
    whoAmI(@CurrentClient() client: Client) {
        //console.log(client);
        //return this.clientService.getClientById(client.idClient);
        return client;
    }
}
