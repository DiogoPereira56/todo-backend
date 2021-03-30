import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'src/clients/client.model';
import { ClientService } from '../clients/client.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private ClientService: ClientService,
    private jwtService: JwtService,
  ){}

  /** 
   * Takes an email and password, checks if Client exists and if the password is correct, then gives them a JWT Token
   *
   * @param {string} email - A client's email
   * @param {string} password - A client's password
   * @param {Response} res - A POST's response
   * 
   * @return {Boolean} - Returns true if client was validated, or false if it wasn't
   *
   * @example
   *
   *     validateClient(client.email, client.password);
   */
  async validateClient(email: string, password: string, res: Response): Promise<Boolean> {
    const client = await this.ClientService.getOneClient(email);

    if ( client && await bcrypt.compare(password, client.password) ) {
      const token = await this.giveJwtToken(client);
      res.cookie('token', token);

      console.log(client.name + ' just logged in :D ');
      return true;
    }
    
    return false;
  }

  /** 
   * Gives a Token to a Client
   *
   * @param {Client} client - Represents a client
   * 
   * @return {string} - Returns a newly formed client's JWT Token
   *
   * @example
   *
   *     giveJwtToken(client)
   */
  async giveJwtToken(client: Client): Promise<string> {
    const payload = { name: client.name, sub: client.idClient };
    return this.jwtService.sign(payload);
  }
  
}