export abstract class Repository {
     protected readonly baseUrl: string | undefined;
     protected readonly collectionEndpoint: string;
     protected readonly itemEndpoint: string;

     protected constructor() {
          this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
     }

     abstract getAll(page: number, notebook: string): Promise<Response>;
     abstract post(data: object): Promise<Response>;
}