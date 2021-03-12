import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ClientsResolver } from './clients.resolver';
import { Clients } from './clients.model'
import { ClientsService } from './clients.service';

@Module({
  //Registers your objection models
  imports: [ObjectionModule.forFeature([Clients])],

  providers: [ClientsResolver, ClientsService],
})
export class ClientModule {}
