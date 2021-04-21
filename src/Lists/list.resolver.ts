import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CurrentClient } from 'src/auth/auth.currentClient';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Client } from 'src/clients/client.model';
import { Task } from 'src/tasks/task.model';
import { TaskService } from 'src/tasks/task.service';
import { ListOfTasks } from './list.model';
import { ListOfTasksService } from './list.service';

@Resolver(() => ListOfTasks)
export class ListOfTasksResolver {
    constructor(
        private readonly listOfTasksService: ListOfTasksService,
        private readonly taskService: TaskService,
    ) {}

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
    @UseGuards(GqlAuthGuard)
    @Query(() => [ListOfTasks])
    async lists(): Promise<ListOfTasks[]> {
        return this.listOfTasksService.getAllLists();
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
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    public async addList(@Args('listName') listName: string, @CurrentClient() client: Client) {
        return this.listOfTasksService.createList(listName, client.idClient);
    }

    /**
     * Removes a list from the DataBase
     *
     * @param {number} idList - The id of the List
     *
     * @returns {string} - Returns a string saying that the list was removed
     *
     * @example
     *
     */
    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    public async removeList(
        @Args('idList') idList: number,
        @Args('idClient') idClient: number,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.listOfTasksService.deleteList(idList);
        }
        return null;
    }

    /**
     * Updates the title of a List
     *
     * @param {number} idList - The id of the List
     *
     * @param {string} title - The title of the List
     *
     * @returns {ListOfTasks} - Returns the List that was updated
     *
     * @example
     *
     */
    @UseGuards(GqlAuthGuard)
    @Mutation(() => ListOfTasks)
    public async updateList(
        @Args('idList') idList: number,
        @Args('title') title: string,
        @Args('idClient') idClient: number,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.listOfTasksService.updateList(idList, title);
        }
        return null;
    }

    /* @Query(() => [ListOfTasks])
    async testList() {
        return this.listOfTasksService.testList();
    } */

    @UseGuards(GqlAuthGuard)
    @Query(() => Number)
    async getClientTotalLists(@CurrentClient() client: Client) {
        const result = await this.listOfTasksService.getClientTotalLists(client.idClient);
        //console.log(result);
        return result;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => ListOfTasks)
    public async getList(
        @Args('idList') idList: number,
        @Args('idClient') idClient: number,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            const result = await this.listOfTasksService.getList(idList);
            //console.log(result);
            return result;
        }
        return null;
    }

    /**
     * A ResolveField that returns the Tasks of a given List
     *
     *  @Parent {ListOfTasks} listOfTasks - a List
     *
     *  @returns {Task[]} - Returns the Tasks of a given List
     *
     *  @example
     *
     */
    @ResolveField('tasks', () => [Task])
    async getTasks(@Parent() listOfTasks: ListOfTasks): Promise<Task[]> {
        const { idList } = listOfTasks;
        return this.taskService.getListTasks(idList);
    }

    @ResolveField('taskss', () => [Task])
    async getTask(
        @Parent() listOfTasks: ListOfTasks,
        @Args('limit') limit: number,
        @Args('offset') offset: number,
    ): Promise<Task[]> {
        const { idList } = listOfTasks;
        return this.taskService.getListTask(idList, limit, offset);
    }
}
