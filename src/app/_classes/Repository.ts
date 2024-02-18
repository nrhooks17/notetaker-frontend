export abstract class Repository {
     protected readonly baseUrl: string | undefined;

     protected constructor() {
          this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
     }

     abstract getAll(page: string): Promise<Response>;
     abstract post(data: object): Promise<Response>;
}