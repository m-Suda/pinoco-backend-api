import { Pool } from "pg";
import { IDBConnection } from "../../interfaces/database/IDBConnection";

/**
 * Postgresクラス
 */
export class Postgres extends IDBConnection {

    private pool: Pool;

    constructor() {
        super();
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }

    /**
     * DB接続
     */
    public async connect(): Promise<void> {
        await this.pool.connect();
    }

    /**
     * DB切断
     */
    public async end(): Promise<void> {
        await this.pool.end();
    }

    /**
     * クエリ実行
     * @param query
     * @param params
     */
    public async execute(query: string, params: any[] = []): Promise<any> {
        return (await this.pool.query(query, params)).rows;
    }

    /**
     * Transaction Begin
     */
    public async begin(): Promise<void> {
        await this.pool.query('BEGIN');
    }

    /**
     * Transaction Commit
     */
    public async commit(): Promise<void> {
        await this.pool.query('COMMIT');
    }

    /**
     * Transaction Rollback
     */
    public async rollback(): Promise<void> {
        await this.pool.query('ROLLBACK');
    }
}
