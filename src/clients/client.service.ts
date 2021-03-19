import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Client } from "src/clients/client.model";
import { ClientInput } from './dto/client.input'

@Injectable()
export class ClientService{
    /** Injects the Clients */
    constructor(@Inject(Client) private readonly ClientModel: typeof Client){}

    /** Returns an array with all Clients
     * 
     *  @returns {Client} - Returns an array with all Clients
     *
     *  @example
            getAllClients();
    */
    async getAllClients(): Promise<Client[]>{
        return await this.ClientModel.query();
    }

    /** Returns a Client with the given email
     *
     *  @param {string} email - a Client's email
     * 
     *  @returns {Client} - Returns a Client with the given email
     *
     *  @example
            getOneClient(email);
    */
    async getOneClient(email : string): Promise<Client>{
        return await this.ClientModel.query().findOne('email', email);
    }

    /** Returns a Client with the given id
     *
     *  @param {number} idClient - a Client's id
     * 
     *  @returns {Client} - Returns a Client with the given id
     *
     *  @example
            getClientById(idClient);
    */
    async getClientById(idClient : number): Promise<Client>{
        return await this.ClientModel.query().findOne('idClient', idClient);
    }

    /** Creates and returns a new Client
     *
     *  @param {ClientInput} client - A new client
     * 
     *  @returns {Client} - Returns a newly created Client
     *
     *  @example
            createClient(client);
    */
    async createClient(client : ClientInput): Promise<Client>{
        try{
            const newClient = await this.ClientModel.query().insert({
                name: client.name,
                email: client.email,
                password: client.password, //TODO: Hash the Password
            })
            return newClient;
            
        }catch(err){
            throw new UnauthorizedException(' That email is already in use, sorry :/ ')
        }
        
    }
}