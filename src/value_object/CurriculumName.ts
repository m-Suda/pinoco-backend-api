export class CurriculumName {

    private readonly _value: string;

    constructor(curriculumName: string) {
        this._value = curriculumName;
    }

    public get value() {
        return this._value;
    }
}