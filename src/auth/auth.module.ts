import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientModule } from '../clients/clients.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Clients } from '../clients/clients.model'
import { AuthResolver } from './auth.resolver';


@Module({
  imports: [
    ClientModule,
    PassportModule,
    ObjectionModule.forFeature([Clients]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { //Sets timer for Login to expire
          expiresIn: '30s' 
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
  exports: [AuthService, JwtModule, AuthResolver],
})
export class AuthModule {}
