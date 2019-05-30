import { Client } from "pg";

export class Postgres {

    private client: Client;

    constructor() {
        this.client = new Client({
            connectionString: process.env.DATABASE_URL,
        });
    }

    public async connect() {

        await this.client.connect();
    }

    public async executeQuery(query: string, param: any[] = []) {

        return (await this.client.query(query, param)).rows;
    }

    public async end() {

        await this.client.end();
    }

}