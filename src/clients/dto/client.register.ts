import { Field, ArgsType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";


/**
 * Client's possible Register input Table
 */
@ArgsType()
export class ClientRegisterInput{
    @Field()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    password: string;
}