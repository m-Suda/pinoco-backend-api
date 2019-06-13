export class Feedback {
    user_id?: string;
    feedback_id?: string;
    feedback?: string;
    createUser?: string;
    updateUser?: string;

    constructor(init?: Partial<Feedback>) {
        Object.assign(this, init);
    }
}