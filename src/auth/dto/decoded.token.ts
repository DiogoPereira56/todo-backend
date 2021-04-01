import { Field, Int, ObjectType } from "@nestjs/graphql";

/***
 * The type that login used to export
 */
@ObjectType()
export class decodedToken{
    @Field()
    name: string;
    @Field(() => Int)
    id: number;
    
    iat: number;
    
    exp : number;
}