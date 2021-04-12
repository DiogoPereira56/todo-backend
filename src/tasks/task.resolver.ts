import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Resolver()
export class TaskResolver {
    constructor(private readonly taskService: TaskService) {}

    @Query(() => [Task])
    async tasks(): Promise<Task[]> {
        return this.taskService.getAllTasks();
    }

    @Mutation(() => Task)
    public async addTask(@Args('title') title: string, @Args('idList') idList: number) {
        return this.taskService.createTask(title, idList);
    }

    @Mutation(() => String)
    public async removeTask(@Args('idTask') idTask: number) {
        return this.taskService.deleteTask(idTask);
    }

    @Mutation(() => Task)
    public async updateTaskDescription(
        @Args('idTask') idTask: number,
        @Args('description') description: string,
    ) {
        return this.taskService.updateDescription(idTask, description);
    }

    @Mutation(() => Task)
    public async updateTaskCompletion(@Args('idTask') idTask: number, @Args('complete') complete: boolean) {
        return this.taskService.updateCompletion(idTask, complete);
    }

    @Mutation(() => [Task])
    public async sortList(@Args('idTask') idTask: number) {
        return this.taskService.sortAlphabeticaly(idTask);
    }
}
