import { Inject, Injectable } from "@nestjs/common";
import { ListOfTasks } from "./list.model";


@Injectable()
export class ListOfTasksService{
    /** Injects the Lists */
    constructor( @Inject(ListOfTasks) private readonly ListOfTasksModel: typeof ListOfTasks ){}

    /** 
     * Returns an array with all Lists
     * 
     *  @returns {ListOfTasks} - Returns an array with all Lists
     *
     *  @example getAllLists();
    */
    async getAllLists(): Promise<ListOfTasks[]>{
        return await this.ListOfTasksModel.query();
    }
    
}