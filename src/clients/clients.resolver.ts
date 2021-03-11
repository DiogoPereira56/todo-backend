import { Resolver, Query } from "@nestjs/graphql";


@Resolver()
export class ClientsResolver{

    @Query(() => String )
    async hello(){
        return 'hello';
    }

    

}