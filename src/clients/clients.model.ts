import {Model} from 'objection' 

export class Clients extends Model {
  //Name of the Table
  static get tableName() {
    return 'clients';
  }

  //Name of the id column in client's table
  static get idColumn() {
    return 'idClient';
  }

  //All other columns
  name? : string;
  email : string;
  password : string;

}

