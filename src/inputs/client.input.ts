import { InputType, Field } from "@nestjs/graphql";


//Client possible input Table
@InputType()
export class ClientInput{
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    password: string;
}