import { Field, ObjectType, ID } from "@nestjs/graphql";

//Client Table
@ObjectType()
export class ClientType{
    @Field(() => ID)
    idClient: number;
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    password: string;
}