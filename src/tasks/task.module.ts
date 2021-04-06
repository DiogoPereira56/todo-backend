import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    /** Registers your objection models */
    ObjectionModule.forFeature([Task])
  ],
  providers: [TaskResolver, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
