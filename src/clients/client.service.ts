import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'src/clients/client.model';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientService {
    /** Injects the Clients */
    constructor(@Inject(Client) private readonly ClientModel: typeof Client, private config: ConfigService) {}

    /** 
     * Returns an array with all Clients
     * 
     *  @returns {Client} - Returns an array with all Clients
     *
     *  @example
            getAllClients();
    */
    async getAllClients(): Promise<Client[]> {
        return await this.ClientModel.query();
    }

    /** 
     * Returns a Client with the given email
     *
     *  @param {string} email - a Client's email
     * 
     *  @returns {Client} - Returns a Client with the given email
     *
     *  @example
            getOneClient(email);
    */
    async getOneClient(email: string): Promise<Client> {
        return await this.ClientModel.query().findOne('email', email);
    }

    /** 
     *  Returns a Client with the given id
     *
     *  @param {number} idClient - a Client's id
     * 
     *  @returns {Client} - Returns a Client with the given id
     *
     *  @example
            getClientById(idClient);
    */
    async getClientById(idClient: number): Promise<Client> {
        return await this.ClientModel.query().findOne('idClient', idClient);
    }

    /**
     *  Creates and returns a new Client
     *
     *  @param {string} name - A new client's name
     *  @param {string} email - A new client's email
     *  @param {string} password - A new client's password
     *
     *  @returns {Boolean} - returns true if client was created, false if it didn't
     *
     *  @example createClient(clientInput.name, clientInput.email, clientInput.password);
     */
    async createClient(name: string, email: string, password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, parseInt(this.config.get('BCRYPT_SALT').toString()));
        try {
            const newClient = await this.ClientModel.query().insert({
                name: name,
                email: email,
                password: hash,
            });
            console.log(newClient.name + ' got Registered :)');
            return true;
        } catch (err) {
            return false;
        }
    }

    /*     async getAllClientInformation(idClient : number): Promise<Client>{
        return await this.ClientModel.query().findOne('idClient', idClient);
    } */
}
