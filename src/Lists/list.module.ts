import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ListOfTasks } from './list.model';
import { ListOfTasksService } from './list.service';
import { ListOfTasksResolver } from './list.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    /** Registers your objection models */
    ObjectionModule.forFeature([ListOfTasks])
  ],
  providers: [ListOfTasksResolver, ListOfTasksService],
  exports: [ListOfTasksService],
})
export class ListOfTasksModule {}
