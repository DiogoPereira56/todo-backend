import { Field, Int, ObjectType } from '@nestjs/graphql';
import {Model} from 'objection' 

@ObjectType()
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
  @Field(() => Int)
  idClient: number;
  @Field()
  name? : string;
  @Field()
  email : string;
  
  password : string;

}

