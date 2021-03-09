import {Model} from 'objection' 

export class Tasks extends Model {
  static get tableName() {
    return 'Tasks';
  }
  static get relationMappings() {
    const List_of_tasks = require('./list_of_tasks');
    return {
        list_of_tasks: {
            relation: Model.HasOneRelation,
            modelClass: List_of_tasks,
            join: {
                from: 'tasks.idList',
                to: 'list_of_tasks.id'
            }
        },
    }
  }
}
