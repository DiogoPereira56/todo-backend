import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

let mockToken = [
    'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGlvZ28gUGVyZWlyYSIsImlkIjozLCJpYXQiOjE2MjI1Mzc4ODMsImV4cCI6MTYyMjYyNDI4M30.1ikx14BEmjFVVWF_Jz3sqrc3j4eKeAPEgprX7K1e_Uw',
];

let app: INestApplication;
const appService = {
    getAllLists: () => {
        const mockGetAllLists = {
            lists: [
                { idList: 1, listName: 'new name' },
                { idList: 2, listName: 'compras' },
                { idList: 298, listName: 'fff' },
                {
                    idList: 299,
                    listName: 'jdadadadadadadadjdadadadadadadadjdadadadadadadadjdadadadadadadadjdadad',
                },
                { idList: 326, listName: 'zxc' },
                { idList: 327, listName: 'h' },
                {
                    idList: 329,
                    listName: 'palavra palavra palavra palavra palavra palavra palavra palavra',
                },
                { idList: 344, listName: 'gdrgdrgdrgdrgdrgdrgdrg' },
                { idList: 354, listName: 'new list' },
                { idList: 355, listName: 'new list' },
            ],
        };
        return mockGetAllLists;
    },
    createList: () => {
        const mockCreateList = {
            addList: {
                idList: 357,
                idClient: 3,
                listName: 'newList',
            },
        };
        return mockCreateList;
    },
    listQuery: () => {
        const mockListQuery = {
            listQuery: {
                idList: 2,
                idClient: 3,
                listName: 'compras',
                __typename: 'ListOfTasks',
            },
        };
        return mockListQuery;
    },
    removeToken: () => {
        return { removeToken: 'cookie removed' };
    },
    getClientInformation: () => {
        return {
            getClientInformation: {
                list: [
                    {
                        idList: 1,
                        listName: 'new name',
                    },
                    {
                        idList: 2,
                        listName: 'compras',
                    },
                    {
                        idList: 344,
                        listName: 'gdrgdrgdrgdrgdrgdrgdrg',
                    },
                    {
                        idList: 354,
                        listName: 'new list',
                    },
                    {
                        idList: 355,
                        listName: 'new list',
                    },
                ],
            },
        };
    },
    addTask: () => {
        return { addTask: { idTask: 370, title: 'newTask' } };
    },
    removeTask: () => {
        return { removeTask: 'task 369 got deleted' };
    },
};

beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
    })
        .overrideProvider(AppService)
        .useValue(appService)
        .compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    /* app.get('/', (req: Request, res: Response) => {
            res.cookie('token', mockToken);
            res.send();
        }); */
});

afterAll(async () => {
    await app.close();
});

describe('Auth', () => {
    it(`tests the function to login`, async () => {
        await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation{login(email:"asd@asd.com", password:"123123")}',
            })
            .expect(200)
            .expect({ data: { login: true } })
            .then(async (res) => {
                mockToken = res.headers['set-cookie'];
            });
        //console.log(result.body);
    });

    it(`tests the function to log out`, async () => {
        await request(app.getHttpServer())
            .post('/graphql')
            .set('Cookie', mockToken)
            .send({
                query: '{removeToken}',
            })
            .expect(200)
            .expect({ data: appService.removeToken() });
    });
});

describe('Lists', () => {
    it(`gets all lists`, async () => {
        await request(app.getHttpServer())
            .post('/graphql')
            .set('Cookie', mockToken)
            .send({
                query: 'query{lists{idList,listName}}',
            })
            .expect(200)
            .expect({
                data: appService.getAllLists(),
            })
            .then(() => {
                //console.log(mockToken);
            });
    });

    it(`tests the function to login and to show all the lists`, async () => {
        await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation{login(email:"asd@asd.com", password:"123123")}',
            })
            .expect(200)
            .expect({ data: { login: true } })
            .then(async (asd) => {
                await request(app.getHttpServer())
                    .post('/graphql')
                    .set('Cookie', asd.headers['set-cookie'])
                    .send({
                        query: 'query{lists{idList,listName}}',
                    })
                    .expect(200)
                    .expect({
                        data: appService.getAllLists(),
                    });
            });
    });

    it(`tests the function to get a list by id`, async () => {
        await request(app.getHttpServer())
            .post('/graphql')
            .set('Cookie', mockToken)
            .send({
                query: 'query{listQuery(idList: 2, idClient: 3) {idList,idClient,listName,__typename}}',
            })
            .expect(200)
            .expect({
                data: appService.listQuery(),
            })
            .then(() => {
                //console.log(mockToken);
            });
    });

    /* it(`tests the function to add a list`, async () => {
        await request(app.getHttpServer())
            .post('/graphql')
            .set('Cookie', mockToken)
            .send({
                query: 'mutation {addList(listName: "newList") {idList,idClient,listName}}',
            })
            .expect(200)
            .expect({
                data: appService.createList(),
            })
            .then(() => {
                //console.log(mockToken);
            });
    }); */

    /* it(`gets all lists`, async () => {
        //.set('Cookie', mockToken2)
        const result = await request(app.getHttpServer())
            .post('/graphql')
            .set('Cookie', mockToken2)
            .end(async function (err, test) {
                //if (err) throw err;
                console.log(test);
            });
        //.expect(200);
        //console.log(result.body);
    }); */

    /* const login = async (extra: () => void) => {
        await request(app.getHttpServer())
            .post('/graphql')
            .send({
                query: 'mutation{login(email:"asd@asd.com", password:"123123")}',
            })
            .expect(200)
            .then(() => {
                extra();
            });
    }; */

    /* it(`gets all lists`, async () => {
        //.set('Cookie', mockToken2)
        const result = await request(app.getHttpServer()).post('/graphql').set({ token: mockToken }).send({
            query: 'query{lists{idList,listName}}',
        });
        //.expect(200);
        //console.log(result.body);
    }); */
});

describe('Client', () => {
    it(`tests the function to get the client information`, async () => {
        await request(app.getHttpServer())
            .post('/graphql')
            .set('Cookie', mockToken)
            .send({
                query: '{getClientInformation {list(limit: 10, offset: 0) {idList,listName}}}',
            })
            .expect(200)
            .expect({ data: appService.getClientInformation() });
    });
});

describe('Tasks', () => {
    it(`tests the function to add a task`, async () => {
        await request(app.getHttpServer())
            .post('/graphql')
            .set('Cookie', mockToken)
            .send({
                query: 'mutation{addTask(title: "newTask", idList: 1, idClient: 3) {idTask,title}}',
            })
            .expect(200)
            .expect({ data: appService.addTask() });
    });

    it(`tests the function to delete a task`, async () => {
        await request(app.getHttpServer())
            .post('/graphql')
            .set('Cookie', mockToken)
            .send({
                query: 'mutation {removeTask(idTask: 369, idClient:3)}',
            })
            .expect(200)
            .expect({ data: appService.removeTask() });
    });
});
