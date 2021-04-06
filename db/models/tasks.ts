import {Model} from 'objection' 

export class Tasks extends Model {
  static get tableName() {
    return 'tasks';
  }
  static get relationMappings() {
    const List_of_tasks = require('./list_of_tasks');
    return {
        list_of_task: {
            relation: Model.HasManyRelation,
            modelClass: List_of_tasks,
            join: {
                from: 'tasks.idList',
                to: 'list_of_tasks.idList'
            }
        },
    }
  }
}
