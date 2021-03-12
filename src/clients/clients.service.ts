import { Inject, Injectable } from "@nestjs/common";
import { Clients } from "src/clients/clients.model";
//import { CreateClientDto } from '../dto/createClient.dto'
import { ClientInput } from '../inputs/client.input'

@Injectable()
export class ClientsService{
    //injects the Clients
    constructor(@Inject(Clients) private readonly ClientModel: typeof Clients){}

    //Returns an array with all Clients
    async getAllClients(): Promise<Clients[]>{
        return await this.ClientModel.query();
    }

    //Returns a Client with the given email
    async getOneClient(email : string): Promise<Clients>{
        return await this.ClientModel.query().findOne('email', email);
    }

    //Creates and returns a new Client
    async createClient(client : ClientInput): Promise<Clients>{
        const newClient = await this.ClientModel.query().insert({
            name: client.name,
            email: client.email,
            password: client.password, //TODO: Hash the Password
        })
        return newClient;
    }
}