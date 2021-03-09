import {Model} from 'objection' 

export class ListOfTasks extends Model {
  static get tableName() {
    return 'List Of Tasks';
  }
  static get relationMappings() {
    const Clients = require('./clients');
    return {
      clients: {
        relation: Model.HasOneRelation,
        modelClass: Clients,
        join: {
          from: 'listOfTasks.idClient',
          to: 'client.id'
        }
      },
    }
  }
}
