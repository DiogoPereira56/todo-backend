import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { ListOfTasks } from 'src/Lists/list.model';
import { ListOfTasksService } from 'src/Lists/list.service';
import { Client } from './client.model';
import { ClientService } from './client.service';
import { ClientType } from './dto/client.type';

@Resolver(() => Client)
export class ClientResolver {
    constructor(
        private readonly clientService: ClientService,
        private readonly listOfTasksService: ListOfTasksService,
    ) {}

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
    @Query(() => [ClientType])
    async clients(): Promise<Client[]> {
        return this.clientService.getAllClients();
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
    @Query(() => Client)
    async client(@Args('idClient') idClient: number) {
        return this.clientService.getClientById(idClient);
    }

    /**
     * A ResolveField that returns the lists of a given Client
     *
     *  @Parent {Client} client - a Client
     *
     *  @returns {ListOfTasks[]} - Returns the lists of a given Client
     *
     *  @example
     *
     */
    @ResolveField('lists', () => [ListOfTasks])
    async getLists(@Parent() client: Client): Promise<ListOfTasks[]> {
        const { idClient } = client;
        return this.listOfTasksService.getClientLists(idClient);
    }
}
