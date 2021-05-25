import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Module } from '@nestjs/common';
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
                            host: config.get('DB_HOST'),
                            user: config.get('DB_USERNAME'),
                            password: config.get('DB_PASSWORD'),
                            database: config.get('DB_DATABASE'),
                        },
                    },
                };
            },
        }),
    ],
    exports: [ObjectionModule],
})
export class DatabaseModule {}
