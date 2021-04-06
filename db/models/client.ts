import {Model} from 'objection' 

export class Client extends Model {
  static get tableName() {
    return 'client';
  }
}