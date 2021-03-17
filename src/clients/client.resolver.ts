import { Resolver, Query } from "@nestjs/graphql";
import { ClientService } from './client.service';
import { ClientType } from './dto/client.type'


@Resolver()
export class ClientResolver{
    constructor(private readonly ClientService: ClientService){}

    @Query(() => String )
    async hello(){
        return 'hello';
    }

    //Returns an array with all Clients
    @Query(() => [ClientType] )
    async clients(){
        return this.ClientService.getAllClients();
    }


}