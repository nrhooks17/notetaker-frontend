import { Repository } from "@/app/_classes/Repository";

export class NotebookProvider extends Repository {

    constructor() {
        super();
        this.collectionEndpoint = 'notebooks';
        this.itemEndpoint = 'notebook';
    }

   public async getAll(page: number, notebook: string): Promise<Response> {
        try {
            const response: Response = await fetch(`${this.baseUrl}/notebooks?notebook=${notebook}`)

            return await response.json()
        }catch (e){
            return Promise.reject(e)
        }
    }

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