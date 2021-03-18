import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/auth.guard";
import { Client } from "./client.model";
import { ClientService } from './client.service';
import { ClientType } from './dto/client.type'


@Resolver()
export class ClientResolver{
    constructor(private readonly ClientService: ClientService){}

    @Query(() => String )
    async hello(){
        return 'hello';
    }

    /* Returns an array with all Clients */
    @Query(() => [ClientType] )
    async clients(){
        return this.ClientService.getAllClients();
    }

    /* Returns a Client with the given id */
    @UseGuards(GqlAuthGuard)
    @Query(() => Client )
    async client(@Args('idClient') idClient: number){
        return this.ClientService.getClientById(idClient);
    }

}