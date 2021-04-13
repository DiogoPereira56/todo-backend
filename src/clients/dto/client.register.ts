import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

/**
 * Client's possible Register input Table
 */
@ArgsType()
export class ClientRegisterInput {
    @Field()
    name: string;

    @Field()
    @IsEmail()
    @Length(1, 70)
    email: string;

    @Field()
    @IsNotEmpty()
    @Length(6, 12)
    password: string;
}
