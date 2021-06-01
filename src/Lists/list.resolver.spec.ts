import { Client } from 'src/clients/client.model';
import { TaskService } from 'src/tasks/task.service';
import { ListOfTasks } from './list.model';
import { ListOfTasksResolver } from './list.resolver';
import { ListOfTasksService } from './list.service';

describe('listsResolver', () => {
    let listsResolver: ListOfTasksResolver;
    let listsService: ListOfTasksService;
    let tasksService: TaskService;
    const mockClient = { idClient: 3, name: 'diogo', email: 'asd@asd.com', password: '123123' };

    beforeEach(async () => {
        listsService = new ListOfTasksService(ListOfTasks);
        listsResolver = new ListOfTasksResolver(listsService, tasksService);
    });

    describe('tests', () => {
        it('should return an array of all lists', async () => {
            const result = [{ idList: 1, idClient: 3, listName: 'list' }];
            jest.spyOn(listsService, 'getAllLists').mockImplementation(
                async () => (result as unknown) as Promise<ListOfTasks[]>,
            );
            expect(await listsResolver.lists()).toBe(result);
        });

        it('should test the function to add lists', async () => {
            const result = { idList: 10, idClient: 3, listName: 'teste' };
            jest.spyOn(listsService, 'createList').mockImplementation(
                async () => (result as unknown) as Promise<ListOfTasks>,
            );
            expect(await listsResolver.addList('teste', mockClient as Client)).toBe(result);
        });

        it('should test the function to remove lists', async () => {
            const result = 'deleted';
            jest.spyOn(listsService, 'deleteList').mockImplementation(async () => result);
            expect(await listsResolver.removeList(5, 3, mockClient as Client)).toBe(result);
        });
    });
});
