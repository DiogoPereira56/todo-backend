import { Inject, Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    /** Injects the Tasks */
    constructor(@Inject(Task) private readonly TaskModel: typeof Task) {}

    /**
     *  Returns all the Tasks
     *
     * @returns {Task[]} - Returns all the Tasks
     *
     * @example getAllTasks();
     */
    async getAllTasks(): Promise<Task[]> {
        return await this.TaskModel.query();
    }

    /**
     *  Returns the Tasks of a certain List
     *
     * @param {number} idList - A Lists's id
     *
     * @returns {Task[]} - Returns the Tasks of a certain List
     *
     * @example getListTasks(idList);
     */
    async getListTasks(idList: number): Promise<Task[]> {
        return await this.TaskModel.query().where('idList', '=', idList);
    }

    async getListTask(idList: number, limit: number, offset: number, orderByTitle: boolean): Promise<Task[]> {
        if (orderByTitle) {
            return await this.TaskModel.query()
                .where('idList', '=', idList)
                .limit(limit)
                .offset(offset)
                .orderBy('title');
        } else {
            return await this.TaskModel.query().where('idList', '=', idList).limit(limit).offset(offset);
        }
    }

    async sortAlphabeticaly(idList: number): Promise<Task[]> {
        return await this.TaskModel.query().where('idList', '=', idList).limit(5).offset(0).orderBy('title');
    }

    async getListsTotalTasks(idList: number): Promise<number> {
        return await this.TaskModel.query().where('idList', '=', idList).resultSize();
    }

    /**
     *  Creates a new Task
     *
     * @param {string} title - A Task's title
     *
     * @param {number} idList - A Lists's id
     *
     * @returns {Task} - Returns a newly created Task
     *
     * @example createTask(title, idList);
     */
    async createTask(title: string, idList: number): Promise<Task> {
        try {
            const newTask = await this.TaskModel.query().insert({
                idList: idList,
                title: title,
                complete: false,
                description: '',
            });
            console.log(title + ' Task got Added');
            return newTask;
        } catch (err) {
            console.log(title + ' was not Added');
            throw err;
        }
    }

    /**
     *  Deletes a Task
     *
     * @param {number} id - A Task's id
     *
     * @returns {string} - Returns a string saying that the Task was removed
     *
     * @example deleteTask(idTask);
     */
    async deleteTask(id: number): Promise<string> {
        try {
            await this.TaskModel.query().deleteById(id);
            return 'task ' + id + ' got deleted';
        } catch (err) {
            return 'task was not deleted';
        }
    }

    /**
     *  Updates a Task's description
     *
     * @param {number} id - A Task's id
     *
     * @param {string} description - A Task's description
     *
     * @returns {Task} - Returns the updated Task
     *
     * @example updateDescription(idTask, description);
     */
    async updateDescription(id: number, description: string): Promise<Task> {
        await this.TaskModel.query().findById(id).patch({ description: description });

        return this.TaskModel.query().findById(id);
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
    async updateTitle(id: number, title: string): Promise<Task> {
        await this.TaskModel.query().findById(id).patch({ title: title });

        return this.TaskModel.query().findById(id);
    }

    /**
     *  Updates a Task's completion
     *
     * @param {number} id - A Task's id
     *
     * @param {boolean} complete - A Task's completion
     *
     * @returns {Task} - Returns the updated Task
     *
     * @example updateCompletion(idTask, complete);
     */
    async updateCompletion(id: number, complete: boolean): Promise<Task> {
        await this.TaskModel.query().findById(id).patch({ complete: complete });

        return this.TaskModel.query().findById(id);
    }

    async paginated(limit: number, offset: number): Promise<Task[]> {
        const result = await this.TaskModel.query().limit(limit).offset(offset);
        console.log(result.length);
        return result;
    }

    /**
     * SELECT tasks.*
        FROM todo.tasks
        INNER JOIN todo.list_of_tasks ON list_of_tasks.idList = tasks.idList
        INNER JOIN todo.client ON client.idClient = list_of_tasks.idClient
        WHERE client.idClient = 3
        ;
     */
    async getAllClientTasks(
        limit: number,
        offset: number,
        id: number,
        orderByTitle: boolean,
    ): Promise<Task[]> {
        if (!orderByTitle) {
            return await this.TaskModel.query()
                .select('tasks.*')
                .innerJoin('list_of_tasks as lists', 'lists.idList', 'tasks.idList')
                .innerJoin('client as client', 'client.idClient', 'lists.idClient')
                .where('client.idClient', '=', id)
                .limit(limit)
                .offset(offset);
        } else {
            return await this.TaskModel.query()
                .select('tasks.*')
                .innerJoin('list_of_tasks as lists', 'lists.idList', 'tasks.idList')
                .innerJoin('client as client', 'client.idClient', 'lists.idClient')
                .where('client.idClient', '=', id)
                .limit(limit)
                .offset(offset)
                .orderBy('title');
        }
    }

    async getTotalAllClientTasks(id: number): Promise<number> {
        return await this.TaskModel.query()
            .select('tasks.*')
            .innerJoin('list_of_tasks as lists', 'lists.idList', 'tasks.idList')
            .innerJoin('client as client', 'client.idClient', 'lists.idClient')
            .where('client.idClient', '=', id)
            .resultSize();
    }
}
