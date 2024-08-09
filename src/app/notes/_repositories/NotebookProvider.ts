import { Repository } from "@/app/_classes/Repository";

/**
 * The NotebookProvider class
 */
export class NotebookProvider extends Repository {

    constructor() {
        super();
        this.collectionEndpoint = 'notebooks';
        this.itemEndpoint = 'notebook';
    }

    /**
     * Fetches all notebooks from the Notetaker API
      * @param page
     * @param notebook
     */
   public async getAll(page: number, notebook: string): Promise<Response> {
        try {
            const response: Response = await fetch(`${this.baseUrl}/notebooks?notebook=${notebook}`)

            return await response.json()
        }catch (e){
            return Promise.reject(e)
        }
    }

    /**
     * Posts a new notebook to the Notetaker API
      * @param data
     */
   public async post(data: object): Promise<Response> {
        try {
            const response: Response = await fetch(`${this.baseUrl}/notebook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            return await response
        } catch(e) {
            Promise.reject(e)
        }
    }

}