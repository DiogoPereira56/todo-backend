import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ){}

  //Takes an email and password, checks if Client exists and if the password is correct 
  async validateClient(email: string, password: string): Promise<any> {
    console.log('asd')
    const client = await this.clientsService.getOneClient(email);

    if (client && client.password === password) {
      const { password, ...result } = client;
      return result;
      //return true; 
    }
    return null;
    //throw new UnauthorizedException('Incorrect Email or Password');
  }

  async login(client: any) {
    const payload = { name: client.name, sub: client.idClient };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}