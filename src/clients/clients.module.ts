import { Module } from '@nestjs/common';
import { ClientsResolver } from './clients.resolver';

@Module({
  providers: [ClientsResolver],
})
export class ClientModule {}
