import { Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
/* import { AuthService } from "src/auth/auth.service"; */
import { ListOfTasks } from "./list.model";


@Injectable()
export class ListOfTasksService{
    /** Injects the Lists */
    constructor( 
        @Inject(ListOfTasks) private readonly ListOfTasksModel: typeof ListOfTasks,
        /* private authService: AuthService */
        ){}

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

    /** 
     *  Creates a new List, returns true if successfull, false if not
     *
     *  @param {string} listName - A new Lists's name
     * 
     *  @returns {Boolean} - returns true if List was created, false if it didn't
     *
     *  @example createList(listName, idClient);
    */
    async createList( listName: string, id: number ): Promise<Boolean>{
        
        try{
            const newList = await this.ListOfTasksModel.query().insert({
                idClient: id,
                listName: listName,
            });
            console.log(listName + ' List got Added');
            return true;
            
        }catch(err){
            console.log(listName + ' was not Added');
            return false;
        }
    }
    
    async testList(){
        const lists = await this.ListOfTasksModel.query().where('idClient', 3).withGraphFetched("tasks");
        /* console.log(lists[0]); */
        return lists;
    }


    async getClientLists(idClient : number): Promise<ListOfTasks[]>{
        return await this.ListOfTasksModel.query().where('idClient', '=', idClient);
    }

}