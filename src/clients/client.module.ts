import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ClientResolver } from './client.resolver';
import { Client } from './client.model';
import { ClientService } from './client.service';
import { ListOfTasksModule } from '../Lists/list.module';

@Module({
    imports: [
        ListOfTasksModule,
        /** Registers your objection models */
        ObjectionModule.forFeature([Client]),
    ],
    providers: [ClientResolver, ClientService],
    exports: [ClientService],
})
export class ClientModule {}
