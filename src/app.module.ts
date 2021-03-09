import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientModule } from './clients/clients.module';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Clients } from '../db/models/clients';
import { ListOfTasks } from '../db/models/listOfTasks';
import { Tasks } from '../db/models/Tasks';

@Module({
  imports: [
    ClientModule,
    ObjectionModule.register({
      config: {
        client: "mysql",
        useNullAsDefault: true,
        connection: {
          filename: "./db/todo.sql",
        },
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    ObjectionModule.forFeature([Clients]),
    ObjectionModule.forFeature([ListOfTasks]),
    ObjectionModule.forFeature([Tasks]),
  ],
  exports: [ObjectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
