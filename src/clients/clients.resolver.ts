import { Resolver, Query } from "@nestjs/graphql";


@Resolver()
export class ClientResolver{

    @Query(() => String )
    async hello(){
        return 'hello';
    }

    

}