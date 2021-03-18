import { InputType, Field } from "@nestjs/graphql";


/**
 * Client's possible input Table
 */
@InputType()
export class ClientInput{
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    password: string;
}