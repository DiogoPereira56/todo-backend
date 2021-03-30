import { Field, ObjectType } from "@nestjs/graphql";
import { Client } from "src/clients/client.model";

/***
 * The type that login used to export
 */
@ObjectType()
export class AuthType{
    @Field(() => Client)
    client: Client;
    @Field()
    token: string;
}