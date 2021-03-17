import { Inject, Injectable } from "@nestjs/common";
import { Client } from "src/clients/client.model";
//import { CreateClientDto } from '../dto/createClient.dto'
import { ClientInput } from './dto/client.input'

@Injectable()
export class ClientsService{
    //injects the Clients
    constructor(@Inject(Client) private readonly ClientModel: typeof Client){}

    //Returns an array with all Clients
    async getAllClients(): Promise<Client[]>{
        return await this.ClientModel.query();
    }

    //Returns a Client with the given email
    async getOneClient(email : string): Promise<Client>{
        return await this.ClientModel.query().findOne('email', email);
    }

    //Creates and returns a new Client
    async createClient(client : ClientInput): Promise<Client>{
        const newClient = await this.ClientModel.query().insert({
            name: client.name,
            email: client.email,
            password: client.password, //TODO: Hash the Password
        })
        return newClient;
    }
}