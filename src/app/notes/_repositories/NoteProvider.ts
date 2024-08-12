import {Repository} from '@/app/_classes/Repository';

export class NoteProvider extends Repository{

  /**
   * The constructor for the NoteProvider class
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
     * @param page
     * @param notebook
     * @param upperDateBound
     * @param lowerDateBound
     * @param noteSearchString
     */
  public async getAll(page: number = 1, notebook: string = "default", upperDateBound: string = "", lowerDateBound: string = "", noteSearchString: string = ""): Promise<Response> {
      try {
          const response: Response = await fetch(`${this.baseUrl}/${this.collectionEndpoint}?page=${page}&notebook=${notebook}&upperDateBound=${upperDateBound}&lowerDateBound=${lowerDateBound}&noteSearchString=${noteSearchString}`)

          return await response.json()
      } catch (e){
          return Promise.reject(e)
      }
  }

}