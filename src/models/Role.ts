export class Role {

    roleId?: string;
    roleName?: string;
    createUser?: string;
    updateUser?: string;

    constructor(init?: Partial<Role>) {
        Object.assign(this, init);
    }
}