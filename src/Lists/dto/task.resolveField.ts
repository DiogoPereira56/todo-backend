import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/task.model';

/**
 * Client Table
 */
@ObjectType()
export class TasksResolveField {
    @Field(() => [Task])
    tasks: Promise<Task[]>;
    @Field(() => Int)
    hasMore: number;
}
