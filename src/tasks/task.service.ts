import { Inject, Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    /** Injects the Tasks */
    constructor(@Inject(Task) private readonly TaskModel: typeof Task) {}

    async getAllTasks(): Promise<Task[]> {
        return await this.TaskModel.query();
    }

    async getListTasks(idList: number): Promise<Task[]> {
        return await this.TaskModel.query().where('idList', '=', idList);
    }

    async createTask(title: string, id: number): Promise<Task> {
        try {
            const newTask = await this.TaskModel.query().insert({
                idList: id,
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

    async deleteTask(id: number): Promise<string> {
        try {
            await this.TaskModel.query().deleteById(id);
            return 'task ' + id + ' got deleted';
        } catch (err) {
            return 'task was not deleted';
        }
    }

    async updateDescription(id: number, description: string): Promise<Task> {
        await this.TaskModel.query().findById(id).patch({ description: description });

        return this.TaskModel.query().findById(id);
    }

    async updateCompletion(id: number, complete: boolean): Promise<Task> {
        await this.TaskModel.query().findById(id).patch({ complete: complete });

        return this.TaskModel.query().findById(id);
    }

    async sortAlphabeticaly(id: number): Promise<Task[]> {
        return await this.TaskModel.query().where('idList', '=', id).orderBy('title');
    }
}
