import { Resolver, Query } from "@nestjs/graphql";
import {ClientsService } from './clients.service';
import { CreateClientDto } from '../dto/createClient.dto'


@Resolver()
export class ClientsResolver{
    constructor(private readonly clientsService: ClientsService){}

    @Query(() => String )
    async hello(){
        return 'hello';
    }

    //Returns an array with all Clients
    @Query(() => [CreateClientDto] )
    async clients(){
        return this.clientsService.getAllClients();
    }


}