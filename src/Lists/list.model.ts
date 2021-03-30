import { Field, Int, ObjectType } from '@nestjs/graphql';
import {Model} from 'objection' 

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
  listName : string;
}

