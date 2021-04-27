import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentClient } from 'src/auth/auth.currentClient';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { Client } from 'src/clients/client.model';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Resolver()
export class TaskResolver {
    constructor(private readonly taskService: TaskService) {}

    /**
     * Returns an Array of all the Tasks
     *
     * @returns {Task[]} - Returns an Array of all the Tasks
     *
     * @example
     *
     */
    @UseGuards(GqlAuthGuard)
    @Query(() => [Task])
    async tasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    /**
     * Adds a new Task
     *
     * @param {string} title - The title of the List
     *
     * @param {number} idList - The id of the List
     *
     * @returns {Task} - Returns a newly Created Task
     *
     * @example
     *
     */
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Task)
    public async addTask(
        @Args('title') title: string,
        @Args('idList') idList: number,
        @Args('idClient') idClient: number,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.taskService.createTask(title, idList);
        }
        return null;
    }

    /**
     * Removes a Task
     *
     * @param {number} idTask - The id of a Task
     *
     * @returns {String} - Returns a string saying that the task was removed
     *
     * @example
     *
     */
    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    public async removeTask(
        @Args('idTask') idTask: number,
        @Args('idClient') idClient: number,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.taskService.deleteTask(idTask);
        }
    }

    /**
     * updates a Task's description
     *
     * @param {number} idTask - The id of a Task
     *
     * @param {string} description - The description of a Task
     *
     * @returns {Task} - Returns the updated Task
     *
     * @example
     *
     */
    @Mutation(() => Task)
    @UseGuards(GqlAuthGuard)
    public async updateTaskDescription(
        @Args('idTask') idTask: number,
        @Args('description') description: string,
        @Args('idClient') idClient: number,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.taskService.updateDescription(idTask, description);
        }
    }

    /**
     * updates a Task's title
     *
     * @param {number} idTask - The id of a Task
     *
     * @param {string} title - The title of a Task
     *
     * @returns {Task} - Returns the updated Task
     *
     * @example
     *
     */
    @Mutation(() => Task)
    @UseGuards(GqlAuthGuard)
    public async updateTaskTitle(
        @Args('idTask') idTask: number,
        @Args('title') title: string,
        @Args('idClient') idClient: number,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.taskService.updateTitle(idTask, title);
        }
    }

    /**
     * updates a Task's completion
     *
     * @param {number} idTask - The id of a Task
     *
     * @param {boolean} complete - The completion of a Task
     *
     * @returns {Task} - Returns the updated Task
     *
     * @example
     *
     */
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Task)
    public async updateTaskCompletion(
        @Args('idTask') idTask: number,
        @Args('complete') complete: boolean,
        @Args('idClient') idClient: number,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.taskService.updateCompletion(idTask, complete);
        }
    }

    @Query(() => [Task])
    public async teste(@Args('limit') limit: number, @Args('offset') offset: number) {
        return this.taskService.paginated(limit, offset);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Number)
    async getListsTotalTasks(
        @Args('idList') idList: number,
        @Args('idClient') idClient: number,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            const result = await this.taskService.getListsTotalTasks(idList);
            return result;
        }
        return null;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [Task])
    public async sortList(@Args('idList') idList: number) {
        return this.taskService.sortAlphabeticaly(idList);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [Task])
    public async getAllTasks(
        @Args('limit') limit: number,
        @Args('offset') offset: number,
        @Args('idClient') idClient: number,
        @Args('orderByTitle') orderByTitle: boolean,
        @Args('order') order: string,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.taskService.getAllClientTasks(limit, offset, idClient, orderByTitle, order);
        }
        return null;
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Number)
    public async getTotalAllTasks(@CurrentClient() loggedClient: Client) {
        return this.taskService.getTotalAllClientTasks(loggedClient.idClient);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [Task])
    public async getSearchedTasks(
        @Args('limit') limit: number,
        @Args('offset') offset: number,
        @Args('idClient') idClient: number,
        @Args('orderByTitle') orderByTitle: boolean,
        @Args('search') search: string,
        @Args('order') order: string,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.taskService.searchedTasks(limit, offset, idClient, orderByTitle, search, order);
        }
        return null;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Number)
    public async getTotalSearchedTasks(
        @Args('idClient') idClient: number,
        @Args('search') search: string,
        @CurrentClient() loggedClient: Client,
    ) {
        if (idClient == loggedClient.idClient) {
            return this.taskService.totalSearchedTasks(idClient, search);
        }
        return null;
    }
}
