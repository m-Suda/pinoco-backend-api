export abstract class IDBConnection {
    abstract async connect(): Promise<void>;
    abstract async end(): Promise<void>;
    abstract async execute(query: string, params: any[]): Promise<any>;
    abstract async begin(): Promise<void>;
    abstract async commit(): Promise<void>;
    abstract async rollback(): Promise<void>;
}