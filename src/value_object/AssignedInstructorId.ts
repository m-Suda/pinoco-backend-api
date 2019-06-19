export class AssignedInstructorId {

    private readonly _value: string;

    constructor(id: string | null | undefined) {

        if (!id) {
            console.error('担当講師IDの値が空文字、null、undefined');
            throw new Error('Passed value empty or null or undefined');
        }

        this._value = id;
    }

    public get value() {
        return this._value;
    }

}