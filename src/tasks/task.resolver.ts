import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { Request, Response } from "express";
import { Task } from "./task.model";
import { TaskService } from "./task.service";

@Resolver()
export class TaskResolver{
    constructor(private readonly TaskService: TaskService){}

    @Query(() => [Task] )
    async tasks(): Promise<Task[]>{
        return this.TaskService.getAllTasks();
    }

}