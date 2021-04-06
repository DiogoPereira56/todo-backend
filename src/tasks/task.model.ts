import { Field, Int, ObjectType } from '@nestjs/graphql';
import {Model} from 'objection' 
//import { ListOfTasks } from '../Lists/list.model'

@ObjectType('task')
export class Task extends Model {
  /** Name of the Table */
  static get tableName() {
    return 'tasks';
  }

  /** Name of the id column in tasks's table */
  static get idColumn() {
    return 'idTask';
  }

  /** id of the Task */
  @Field(() => Int, {description: 'id of the Task'})
  idTask: number;

  /** id of the tasks's list */
  @Field(() => Int)
  idList: number;

  /** A title for the List */
  @Field()
  title : string;

  /** If the task is complete or not */
  @Field()
  complete : boolean;

  /** Description of the Task */
  @Field()
  description : string;


}

