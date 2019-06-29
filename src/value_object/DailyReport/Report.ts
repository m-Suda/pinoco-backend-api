import { BaseValueObject } from "../BaseValueObject";

export class Report extends BaseValueObject {

    private readonly _value: string;

    constructor(report: string | null | undefined) {
        super();

        if (!report) {
            this._value = '';
            return;
        }

        if (this.isIncludedIllegalCharacter(report)) {
            console.error(`日報に禁則文字が含まれている。`);
            throw new Error('Used illegal character');
        }

        this._value = report;
    }

    public get value() {
        return this._value;
    }
}