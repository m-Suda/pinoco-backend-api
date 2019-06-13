export class Company {
    companyId?: string;
    companyName?: string;
    createUser?: string;
    updateUser?: string;

    constructor(init?: Partial<Company>) {
        Object.assign(this, init);
    }
}