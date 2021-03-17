import { Field, ObjectType } from "@nestjs/graphql";
import { Clients } from "src/clients/clients.model";

@ObjectType()
export class AuthType{
    @Field(() => Clients)
    client: Clients;
    @Field()
    token: string;
}