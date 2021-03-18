import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/auth.guard";
import { Client } from "./client.model";
import { ClientService } from './client.service';
import { ClientType } from './dto/client.type'


@Resolver()
export class ClientResolver{
    constructor(private readonly ClientService: ClientService){}

    
    /** Returns an array with all Clients
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
    async clients(){
        return this.ClientService.getAllClients();
    }

    /** Returns a Client with the given id
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

}