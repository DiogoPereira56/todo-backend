import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'src/clients/client.model';
import { ClientService } from '../clients/client.service';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private ClientService: ClientService,
    private jwtService: JwtService,
  ){}

  //Takes an email and password, checks if Client exists and if the password is correct, then gives them a JWT Token
  async validateClient(email: string, password: string): Promise<AuthType> {
    const client = await this.ClientService.getOneClient(email);

    if (client && client.password === password) {
      const token = await this.giveJwtToken(client)

      return {client, token}
    }
    
    throw new UnauthorizedException('Incorrect Email or Password');
  }

  //Gives a Token to a Client
  async giveJwtToken(client: Client): Promise<string> {
    const payload = { name: client.name, sub: client.idClient };
    return this.jwtService.sign(payload);
  }
  
}