import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
    @Mutation(() => Task)
    public async addTask(@Args('title') title: string, @Args('idList') idList: number) {
        return this.taskService.createTask(title, idList);
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
    @Mutation(() => String)
    public async removeTask(@Args('idTask') idTask: number) {
        return this.taskService.deleteTask(idTask);
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
    public async updateTaskDescription(
        @Args('idTask') idTask: number,
        @Args('description') description: string,
    ) {
        return this.taskService.updateDescription(idTask, description);
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
    @Mutation(() => Task)
    public async updateTaskCompletion(@Args('idTask') idTask: number, @Args('complete') complete: boolean) {
        return this.taskService.updateCompletion(idTask, complete);
    }

    @Mutation(() => [Task])
    public async sortList(@Args('idTask') idTask: number) {
        return this.taskService.sortAlphabeticaly(idTask);
    }
}
