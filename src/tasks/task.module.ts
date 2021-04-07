import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [
    /** Registers your objection models */
    ObjectionModule.forFeature([Task])
  ],
  providers: [TaskResolver, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
