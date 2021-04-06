import {Model} from 'objection' 

export class ListOfTasks extends Model {
  static get tableName() {
    return 'list_of_tasks';
  }
  static get relationMappings() {
    const Client = require('./client');
    return {
      clients: {
        relation: Model.HasManyRelation,
        modelClass: Client,
        join: {
          from: 'list_of_tasks.idClient',
          to: 'client.idClient'
        }
      },
    }
  }
}
