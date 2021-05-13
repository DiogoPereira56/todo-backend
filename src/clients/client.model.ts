import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { Model } from 'objection';
import { ListOfTasks } from '../Lists/list.model';

@ObjectType()
export class Client extends Model {
    /** Name of the Table */
    static get tableName() {
        return 'client';
    }

    /** Name of the id column in client's table */
    static get idColumn() {
        return 'idClient';
    }

    /** All other columns */
    @Field(() => Int)
    idClient: number;
    @Field()
    @Length(3, 50)
    name?: string;
    @Field()
    @Length(1, 70)
    email: string;

    password: string;

    /* @Field(() => [ListOfTasks])
  lists : ListOfTasks[]; */

    static get relationMappings() {
        return {
            lists: {
                relation: Model.HasManyRelation,
                modelClass: ListOfTasks,
                join: {
                    from: 'client.idClient',
                    to: 'list_of_tasks.idClient',
                },
            },
        };
    }
}
