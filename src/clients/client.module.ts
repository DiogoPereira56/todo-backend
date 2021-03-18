import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ClientResolver } from './client.resolver';
import { Client } from './client.model'
import { ClientService } from './client.service';

@Module({
  imports: [
    /** Registers your objection models */
    ObjectionModule.forFeature([Client])
  ],
  providers: [ClientResolver, ClientService],
  exports: [ClientService],
})
export class ClientModule {}
