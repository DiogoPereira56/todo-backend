import { ObjectionModule } from "@willsoto/nestjs-objection";
import { Module } from "@nestjs/common";
import { knexSnakeCaseMappers } from "objection";
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          config: {
            client: 'mysql',
            connection: {
                host : '127.0.0.1',
                user : 'root',
                password : '',
                database : 'todo'
            },
            ...knexSnakeCaseMappers(),
          },
        };
      },
    }),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}