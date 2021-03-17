import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ClientsResolver } from './client.resolver';
import { Client } from './client.model'
import { ClientsService } from './client.service';

@Module({
  imports: [
    //Registers your objection models
    ObjectionModule.forFeature([Client])
  ],
  providers: [ClientsResolver, ClientsService],
  exports: [ClientsService],
})
export class ClientModule {}
