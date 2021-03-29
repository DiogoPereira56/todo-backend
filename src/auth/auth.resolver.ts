import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request, Response } from "express";
import { Client } from "src/clients/client.model";
import { ClientService } from "src/clients/client.service";
import { ClientInput } from "src/clients/dto/client.input";
import { AuthService } from "./auth.service";
import { AuthType } from "./dto/auth.type";


@Resolver('Auth')
export class AuthResolver {
    constructor(
        private authService: AuthService,
        private clientService: ClientService,
        ) {}

    /** Takes an Email and Password, validates them, and returns the client with a JWT Token
        Also stores the JWT Token in a cookie 
       
    
        @param {string} email - A string representing an email
        @param {string} password - A string representing a password

        @returns {AuthType} Returns a client and it's JWT Token

        @example
            mutation{
                login(
                    email:"teste@hotmail.com",
                    password:"pass"
                ) {
                    client{
                    idClient
                    name
                    email
                    }
                    token
                }
            }
    */
    @Mutation(() => Boolean)
    public async login( 
            @Args('email') email: string,
            @Args('password') password: string,
            @Context() ctx: { res: Response, req: Request },
        ){
        const validated = await this.authService.validateClient(email, password, ctx.res);

        return validated;
    }
    
    /** Takes a Client and registers them onto the DataBase

        @param {string} name - A string representing a name
        @param {string} email - A string representing an email
        @param {string} password - A string representing a password

        @returns {Client} Returns the created client

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
    @Mutation(() => Client)
    public async register( @Args('input' ) input: ClientInput ){
        return this.clientService.createClient(input);
    }
    
}