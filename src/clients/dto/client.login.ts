import { Field, ArgsType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";


/**
 * Client's possible input Table
 */
@ArgsType()
export class ClientLoginInput{

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    password: string;

}