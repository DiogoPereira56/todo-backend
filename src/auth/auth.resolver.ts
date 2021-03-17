import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ClientInput } from "src/clients/dto/client.input";
import { AuthService } from "./auth.service";
import { AuthType } from "./dto/auth.type";

@Resolver('Auth')
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Query(() => String )
    async henlo(){
        return 'henlo';
    }

    /* Takes an Email and Password, validates them, and returns the client with a JWT Token */
    @Mutation(() => AuthType)
    public async login( 
            @Args('email') email: string,
            @Args('password') password: string,
        ){
        const response = await this.authService.validateClient(email, password);
        
        return {client: response.client, token: response.token};
        
    }
    
}