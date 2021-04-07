import { Resolver, Query, Mutation, Args, Context, ResolveField, Parent } from "@nestjs/graphql";
import { Request, Response } from "express";
import { Task } from "src/tasks/task.model";
import { TaskService } from "src/tasks/task.service";
import { ListOfTasks } from "./list.model";
import { ListOfTasksService } from "./list.service";

@Resolver(() => ListOfTasks)
export class ListOfTasksResolver{
    constructor(
        private readonly ListOfTasksService: ListOfTasksService,
        private readonly TaskService: TaskService
        ){}

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

    @Query(() => [ListOfTasks])
    async testList(){
        return this.ListOfTasksService.testList();
    }

    @ResolveField('tasks', () => [Task])
    async getTasks(@Parent() listOfTasks: ListOfTasks): Promise<Task[]> {
      const { idList } = listOfTasks;
      return this.TaskService.getListTasks( idList );
    }

}