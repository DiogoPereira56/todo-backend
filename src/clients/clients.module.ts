import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ClientsResolver } from './clients.resolver';
import { Clients } from './clients.model'
import { ClientsService } from './clients.service';

@Module({
  imports: [
    //Registers your objection models
    ObjectionModule.forFeature([Clients])
  ],
  providers: [ClientsResolver, ClientsService],
  exports: [ClientsService],
})
export class ClientModule {}
