import { Resolver, Query } from "@nestjs/graphql";
import {ClientsService } from './client.service';
import { ClientType } from './dto/client.type'


@Resolver()
export class ClientsResolver{
    constructor(private readonly clientsService: ClientsService){}

    @Query(() => String )
    async hello(){
        return 'hello';
    }

    //Returns an array with all Clients
    @Query(() => [ClientType] )
    async clients(){
        return this.clientsService.getAllClients();
    }


}