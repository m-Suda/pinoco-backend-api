import { BaseValueObject } from "./BaseValueObject";

export class FeedbackId extends BaseValueObject {

    private readonly _value: string;
    private readonly YEAR_MONTH_DAY_FORMAT = /\d{6}-\d{2}/;

    constructor(id: string | null | undefined) {
        super();

        if (!id) {
            console.error('フィードバックIDの値がnullまたはundefined');
            throw new Error('Passed value null or undefined');
        }

        if (!this.isValueFormatValid(id, this.YEAR_MONTH_DAY_FORMAT)) {
            console.error('フィードバックIDの形式に誤りがある。');
            throw new Error('FeedbackID format is incorrect');
        }

        this._value = id;
    }

    public get value() {
        return this._value;
    }
}