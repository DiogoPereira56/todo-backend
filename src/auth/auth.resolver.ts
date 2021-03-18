import { Req, Res } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthType } from "./dto/auth.type";


@Resolver('Auth')
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Query(() => String )
    async henlo(){
        return 'henlo';
    }

    /* 
        Takes an Email and Password, validates them, and returns the client with a JWT Token
        Also stores the JWT Token in a cookie 
    */
    @Mutation(() => AuthType)
    public async login( 
            @Args('email') email: string,
            @Args('password') password: string,
            @Context() ctx: { res: Response, req: Request },
        ){
        const validated = await this.authService.validateClient(email, password);

        ctx.res.cookie('token', validated.token)
        
        return {client: validated.client, token: validated.token};
        
    }
    
}