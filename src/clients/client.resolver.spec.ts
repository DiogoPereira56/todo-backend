import { ClientService } from './client.service';
import { Client } from './client.model';
import { ClientResolver } from './client.resolver';
import { ConfigService } from '@nestjs/config';
import { ListOfTasksService } from '../Lists/list.service';
import { ListOfTasks } from '../Lists/list.model';

describe('clientResolver', () => {
    let clientResolver: ClientResolver;
    let clientService: ClientService;
    const mockClient = { idClient: 3, name: 'diogo', email: 'asd@asd.com', password: '123123' } as Client;

    beforeEach(async () => {
        clientService = new ClientService(Client, new ConfigService());
        clientResolver = new ClientResolver(clientService, new ListOfTasksService(ListOfTasks));
    });

    describe('tests', () => {
        it('should return an array of all clients', async () => {
            const result = [mockClient];
            jest.spyOn(clientService, 'getAllClients').mockImplementation(async () => result);
            expect(await clientResolver.clients()).toBe(result);
        });

        it('should return a client', async () => {
            const result = mockClient;
            jest.spyOn(clientService, 'getClientById').mockImplementation(async () => result);
            expect(await clientResolver.getClientInformation(mockClient)).toBe(result);
        });

        it('should test the function to add a client', async () => {
            const result = mockClient;
            jest.spyOn(clientService, 'getClientById').mockImplementation(async () => result);
            expect(await clientResolver.client(3)).toBe(result);
        });
    });
});
