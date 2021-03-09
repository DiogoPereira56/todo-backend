import { Module } from '@nestjs/common';
import { ClientResolver } from './clients.resolver';

@Module({
  providers: [ClientResolver],
})
export class ClientModule {}
