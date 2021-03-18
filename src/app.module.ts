import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientModule } from './clients/client.module';
import { DatabaseModule } from '../db/database.module'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientModule,
    DatabaseModule,
    AuthModule,
    //Makes the '.env' variables global 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({req}) => ({req}),
    }),
  ],
 
  providers: [AppService],
})
export class AppModule {}
