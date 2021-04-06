import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { Request, Response } from "express";
import { ListOfTasks } from "./list.model";
import { ListOfTasksService } from "./list.service";

@Resolver()
export class ListOfTasksResolver{
    constructor(private readonly ListOfTasksService: ListOfTasksService){}

    /** 
     * Returns an array with all lists
     *
     *  @returns {ListOfTasks[]} - Returns an Array with all lists
     *
     *  @example
     *  {
            lists{
                idList
                idClient
                listName
            }
        }
     * 
    */
    @Query(() => [ListOfTasks] )
    async lists(): Promise<ListOfTasks[]>{
        return this.ListOfTasksService.getAllLists();
    }

    /** 
     *  Registers a new List onto the DataBase 
     * 
     *  @param {newList} name - A string representing a name
     * 
     * @returns {Boolean} Returns true if List was created, false if it didn't
     * 
     * @example
     * 
    */
    @Mutation(() => Boolean)
    public async addList( @Args('listName') listName: string, @Context() ctx: { res: Response, req: Request } ){
        return this.ListOfTasksService.createList(listName, ctx.req);
    }

    @Query(() => [ListOfTasks])
    async test(){
        return this.ListOfTasksService.test();
    }

}