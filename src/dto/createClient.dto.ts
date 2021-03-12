import { Field, ObjectType, ID } from "@nestjs/graphql";

//Client Table
@ObjectType()
export class CreateClientDto{
    @Field(() => ID)
    idClient: number;
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    password: string;
}