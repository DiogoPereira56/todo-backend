import { Resolver, Query } from "@nestjs/graphql";
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
     * 
    */
    @Query(() => [ListOfTasks] )
    async lists(): Promise<ListOfTasks[]>{
        return this.ListOfTasksService.getAllLists();
    }

}