import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientModule } from './clients/clients.module';
import { DatabaseModule } from '../db/database.module'

@Module({
  imports: [
    ClientModule,
    DatabaseModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
  ],
 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
