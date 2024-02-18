import {Repository} from '@/app/_classes/Repository';

export class NoteRepository extends Repository{

  /**
   * The endpoint for the collection of notes
   * @private
  */
  private readonly collectionEndpoint: string;
  private readonly itemEndpoint: string;


  /**
   * The constructor for the NoteRepository class
  */
  constructor() {
   super();
   this.collectionEndpoint = 'notes';
   this.itemEndpoint = 'note';
  }

    /**
     * Posts a new note to the Notetaker API
     * @param data
     */
  public async post(data: object): Promise<Response> {
      return await fetch(`${this.baseUrl}/${this.itemEndpoint}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });
  }

    /**
     * Fetches all notes from the Notetaker API
     */
  public async getAll(page: number = 1, notebook: string = "default"): Promise<Response> {
      try {
          // return []

          const response: Response = await fetch(`${this.baseUrl}/${this.collectionEndpoint}?page=${page}&notebook=${notebook}`)

          return await response.json()
      } catch (e){
          return Promise.reject(e)
      }
  }

    /**
     * Grabs the total amount of pages in a notebook
     */
  public async getTotalPages(): Promise<number> {
      try {
          const response: Response = await fetch(`${this.baseUrl}/total_pages`)
          return await response.json()
      } catch (e) {
          return Promise.reject(e)
      }
  }
}