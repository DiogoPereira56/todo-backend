import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class AuthService {
  constructor(private clientsService: ClientsService) {}

  //Takes an email and password, checks if Client exists and if the password is correct 
  async validateClient(email: string, password: string): Promise<any> {

    const client = await this.clientsService.getOneClient(email);

    if (client && client.password === password) {
      //const { password, ...result } = client;
      return true; //return result;
    }

    throw new UnauthorizedException('Incorrect Email or Password');
  }
  
}