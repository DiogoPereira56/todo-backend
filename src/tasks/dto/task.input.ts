import { Field, ArgsType } from '@nestjs/graphql';
import { ListOfTasks } from 'src/Lists/list.model';

/**
 * task input
 */
@ArgsType()
export class TaskInput {
    @Field()
    title: string;

    @Field()
    list: ListOfTasks;
}
