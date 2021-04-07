import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientModule } from '../clients/client.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Client } from '../clients/client.model'
import { AuthResolver } from './auth.resolver';
import { ListOfTasksModule } from 'src/Lists/list.module';


@Module({
  imports: [
    ClientModule,
    ListOfTasksModule,
    PassportModule,
    ObjectionModule.forFeature([Client]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { /** Sets a timer for Login to expire in 1800s */
          expiresIn: '1800s' 
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService, JwtModule, AuthResolver],
})
export class AuthModule {}
