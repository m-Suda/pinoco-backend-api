export class User {

    userId?: string;
    userName?: string;
    companyId?: string;
    roleId?: string;
    createUser?: string;
    updateUser?: string;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}