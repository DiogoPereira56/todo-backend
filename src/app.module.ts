import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ClientModule } from './clients/client.module';
import { DatabaseModule } from '../db/database.module'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ListOfTasksModule } from './Lists/list.module';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [
    ClientModule,
    ListOfTasksModule,
    TaskModule,
    DatabaseModule,
    AuthModule,
    /** Makes the '.env' variables global */
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
          origin: 'http://localhost:3001',
          credentials: true,
      },
  }),
  ],
 
  providers: [AppService],
})
export class AppModule {}
