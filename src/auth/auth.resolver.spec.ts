import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ConfigService } from '@nestjs/config';
import { ListOfTasksService } from '../Lists/list.service';
import { ListOfTasks } from '../Lists/list.model';
import { ClientService } from '../clients/client.service';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { Client } from '../clients/client.model';
import { Request, Response } from 'express';
import { decodedToken } from './dto/decoded.token';

describe('clientResolver', () => {
    let authResolver: AuthResolver;
    let authService: AuthService;
    //const mockClient = { idClient: 3, name: 'diogo', email: 'asd@asd.com', password: '123123' } as Client;
    const jwtModuleOptions = {} as JwtModuleOptions;
    const ctx = { res: {} as Response, req: {} as Request };

    beforeEach(async () => {
        authService = new AuthService(
            new ClientService(Client, new ConfigService()),
            new ListOfTasksService(ListOfTasks),
            new JwtService(jwtModuleOptions),
            new ConfigService(),
        );
        authResolver = new AuthResolver(authService, new ClientService(Client, new ConfigService()));
    });

    describe('tests', () => {
        it('should test the function to login the client', async () => {
            const result = true;
            const mockClientInput = { email: 'asd@asd.com', password: '123123' };
            const mockCtx = ctx;
            jest.spyOn(authService, 'validateClient').mockImplementation(async () => result);
            expect(await authResolver.login(mockClientInput, mockCtx)).toBe(result);
        });

        it('should test the function to decode a token', async () => {
            const result = {} as decodedToken;
            const mockCtx = ctx;
            jest.spyOn(authService, 'decodeToken').mockImplementation(async () => result);
            expect(await authResolver.getDecodedToken(mockCtx)).toBe(result);
        });

        it('should test the function to remove a token', async () => {
            const result = 'cookie removed';
            const mockCtx = ctx;
            jest.spyOn(authService, 'invalidateToken').mockImplementation(async () => result);
            expect(await authResolver.removeToken(mockCtx)).toBe(result);
        });
    });
});
