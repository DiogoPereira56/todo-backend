import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

/**
 * Client's possible Login input Table
 */
@ArgsType()
export class ClientLoginInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @Length(6, 12)
    password: string;
}
