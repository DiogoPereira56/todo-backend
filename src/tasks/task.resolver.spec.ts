import { Client } from 'src/clients/client.model';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskResolver } from './task.resolver';

describe('taskResolver', () => {
    let taskResolver: TaskResolver;
    let taskService: TaskService;
    const mockClient = { idClient: 3, name: 'diogo', email: 'asd@asd.com', password: '123123' } as Client;
    const mockTask = { idTask: 1, idList: 1, title: 't', complete: false, description: '' } as Task;

    beforeEach(async () => {
        taskService = new TaskService(Task);
        taskResolver = new TaskResolver(taskService);
    });

    describe('tests', () => {
        it('should return an array of all tasks', async () => {
            const result = [mockTask];
            jest.spyOn(taskService, 'getAllTasks').mockImplementation(async () => result);
            expect(await taskResolver.tasks()).toBe(result);
        });

        it('should test the function to add a task', async () => {
            const result = mockTask;
            jest.spyOn(taskService, 'createTask').mockImplementation(async () => result);
            expect(await taskResolver.addTask('t', 1, 3, mockClient)).toBe(result);
        });

        it('should test the function to remove a task', async () => {
            const result = 'deleted';
            jest.spyOn(taskService, 'deleteTask').mockImplementation(async () => result);
            expect(await taskResolver.removeTask(1, 3, mockClient)).toBe(result);
        });
    });
});
