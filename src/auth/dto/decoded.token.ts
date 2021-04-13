import { Field, Int, ObjectType } from '@nestjs/graphql';

/***
 * A JWT decoded Token
 */

@ObjectType()
export class decodedToken {
    @Field()
    name: string;
    @Field(() => Int)
    id: number;

    iat: number;

    exp: number;
}
