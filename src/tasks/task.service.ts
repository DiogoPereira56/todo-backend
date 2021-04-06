import { Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";
import { Task } from "./task.model";


@Injectable()
export class TaskService{
    /** Injects the Tasks */
    constructor( 
        @Inject(Task) private readonly TaskModel: typeof Task,
        private authService: AuthService
    ){}

    async getAllTasks(): Promise<Task[]>{
        return await this.TaskModel.query();
    }

}