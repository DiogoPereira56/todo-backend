import { Inject, Injectable } from '@nestjs/common';
/* import { AuthService } from "src/auth/auth.service"; */
import { ListOfTasks } from './list.model';

@Injectable()
export class ListOfTasksService {
    /** Injects the Lists */
    constructor(
        @Inject(ListOfTasks)
        private readonly ListOfTasksModel: typeof ListOfTasks /* private authService: AuthService */,
    ) {}

    /**
     * Returns an array with all Lists
     *
     *  @returns {ListOfTasks} - Returns an array with all Lists
     *
     *  @example getAllLists();
     */
    async getAllLists(): Promise<ListOfTasks[]> {
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
    async createList(listName: string, id: number): Promise<boolean> {
        try {
            await this.ListOfTasksModel.query().insert({
                idClient: id,
                listName: listName,
            });
            console.log(listName + ' List got Added');
            return true;
        } catch (err) {
            console.log(listName + ' was not Added');
            return false;
        }
    }

    /**
     *  Deletes a List and it's Tasks
     *
     *  @param {number} id - A Lists's id
     *
     *  @returns {string} - Returns a string saying that the list was removed
     *
     *  @example deleteList(id)
     */
    async deleteList(id: number): Promise<string> {
        try {
            await this.ListOfTasksModel.query().deleteById(id);
            return 'list ' + id + ' got deleted';
        } catch (err) {
            return 'list was not deleted';
        }
    }

    /**
     *  Updates the name of a List
     *
     * @param {number} id - A Lists's id
     *
     * @param {string} listName - A Lists's name
     *
     * @returns {ListOfTasks} - Returns the updated List
     *
     * @example updateList(idList, title);
     */
    async updateList(id: number, listName: string): Promise<ListOfTasks> {
        await this.ListOfTasksModel.query().findById(id).patch({ listName: listName });

        return this.ListOfTasksModel.query().findById(id);
    }

    /* async testList() {
        const lists = await this.ListOfTasksModel.query().where('idClient', 3).withGraphFetched('tasks');
        //console.log(lists[0]);
        return lists;
    } */

    async getClientLists(idClient: number): Promise<ListOfTasks[]> {
        return await this.ListOfTasksModel.query().where('idClient', '=', idClient);
    }
}
