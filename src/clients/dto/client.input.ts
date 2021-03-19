import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";


/**
 * Client's possible input Table
 */
@InputType()
export class ClientInput{
    @Field()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    password: string;
}