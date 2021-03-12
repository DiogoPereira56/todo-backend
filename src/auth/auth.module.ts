import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientModule } from '../clients/clients.module';

@Module({
  imports: [ClientModule],
  providers: [AuthService],
})
export class AuthModule {}
