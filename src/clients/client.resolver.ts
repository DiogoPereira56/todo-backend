import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, ResolveField, Parent } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/auth.guard";
import { ListOfTasks } from "src/Lists/list.model";
import { ListOfTasksService } from "src/Lists/list.service";
import { Client } from "./client.model";
import { ClientService } from './client.service';
import { ClientType } from './dto/client.type'

/* @Resolver('Client') */
/* @Resolver(of => Client) */
@Resolver(() => Client)
export class ClientResolver{
    constructor(
        private readonly ClientService: ClientService,
        private readonly listOfTasksService: ListOfTasksService,
        ){}

    
    /** 
     * Returns an array with all Clients
     *
     *  @returns {Client[]} - Returns an Array with all clients
     *
     *  @example
            {
                clients{
                    idClient, 
                    name, 
                    email, 
                    password
                }
            }
    */
    @Query(() => [ClientType] )
    async clients(): Promise<Client[]>{
        return this.ClientService.getAllClients();
    }

    /** 
     * Returns a Client with the given id
     *
     *  @param {number} idClient - a Client's id
     * 
     *  @returns {Client} - Returns a Client with the given id
     *
     *  @example
            {
                client(
                    idClient:1
                )
                {
                    idClient
                    name
                }
            }
    */
    @UseGuards(GqlAuthGuard)
    @Query(() => Client )
    async client(@Args('idClient') idClient: number){
        return this.ClientService.getClientById(idClient);
    }

    /* @Query('client') */
    @Query(returns => Client)  
    async getClientInformation(@Args('idClient') idClient: number) {
      return this.ClientService.getClientById(idClient);
    }

    /* @Query(returns => ListOfTasks) */
    @ResolveField('lists', () => [ListOfTasks])
    async getLists(@Parent() client: Client): Promise<ListOfTasks[]> {
      const { idClient } = client;
      return this.listOfTasksService.getClientLists( idClient );
    }

}