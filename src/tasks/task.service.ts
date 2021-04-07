import { Inject, Injectable } from "@nestjs/common";
import { Task } from "./task.model";


@Injectable()
export class TaskService{
    /** Injects the Tasks */
    constructor( 
        @Inject(Task) private readonly TaskModel: typeof Task,
    ){}

    async getAllTasks(): Promise<Task[]>{
        return await this.TaskModel.query();
    }

    async getListTasks(idList : number): Promise<Task[]>{
        return await this.TaskModel.query().where('idList', '=', idList);
    }

}