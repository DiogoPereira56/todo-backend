import { Field, ObjectType } from "@nestjs/graphql";
import { Client } from "src/clients/client.model";

@ObjectType()
export class AuthType{
    @Field(() => Client)
    client: Client;
    @Field()
    token: string;
}