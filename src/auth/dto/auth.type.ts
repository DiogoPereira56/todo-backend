import { Field, ObjectType } from "@nestjs/graphql";
import { ClientType } from "src/clients/dto/client.type";

@ObjectType()
export class AuthType{
    @Field(() => ClientType)
    client: ClientType;
    @Field()
    token: string;
}