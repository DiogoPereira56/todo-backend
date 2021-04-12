import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
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
    @Query(() => [ListOfTasks])
    async lists(): Promise<ListOfTasks[]> {
        return this.listOfTasksService.getAllLists();
    }

    @Mutation(() => String)
    public async removeList(@Args('idList') idList: number) {
        return this.listOfTasksService.deleteList(idList);
    }

    @Mutation(() => ListOfTasks)
    public async updateList(@Args('idList') idList: number, @Args('title') title: string) {
        return this.listOfTasksService.updateList(idList, title);
    }

    @Query(() => [ListOfTasks])
    async testList() {
        return this.listOfTasksService.testList();
    }

    @ResolveField('tasks', () => [Task])
    async getTasks(@Parent() listOfTasks: ListOfTasks): Promise<Task[]> {
        const { idList } = listOfTasks;
        return this.taskService.getListTasks(idList);
    }
}
