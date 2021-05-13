import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Model } from 'objection';
import { Client } from 'src/clients/client.model';
import { Task } from '../tasks/task.model';

@ObjectType()
export class ListOfTasks extends Model {
    /** Name of the Table */
    static get tableName() {
        return 'list_of_tasks';
    }

    /** Name of the id column in list_of_tasks's table */
    static get idColumn() {
        return 'idList';
    }

    /** id of the list */
    @Field(() => Int)
    idList: number;

    /** id of the client's list */
    @Field(() => Int)
    idClient: number;

    /** Name of the list */
    @Field()
    listName: string;

    /* @Field(() => [Task])
  tasks : Task[]; */

    static get relationMappings() {
        return {
            tasks: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'list_of_tasks.idList',
                    to: 'tasks.idList',
                },
            },
            client: {
                relation: Model.BelongsToOneRelation,
                modelClass: Client,
                join: {
                    from: 'list_of_tasks.idClient',
                    to: 'client.idClient',
                },
            },
        };
    }
}
