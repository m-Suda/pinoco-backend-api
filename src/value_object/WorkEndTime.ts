import { BaseValueObject } from "./BaseValueObject";
import * as moment from "moment";

export class WorkEndTime extends BaseValueObject {

    private readonly _value: string;
    private readonly DATE_FORMAT = /(19[0-9]{2}|2[0-9]{3})-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;

    constructor(timestamp: string | null | undefined) {
        super();

        if (!timestamp) {
            this._value = '';
            return;
        }

        if (this.isHalfWidthSpaceOrFullWidthSpaceOnly(timestamp)) {
            console.error('作業終了時間の値が半角または全角スペースのみ');
            throw new Error('Passed value Half Width Space or Full Width Space');
        }

        if (!this.isValueFormatValid(timestamp, this.DATE_FORMAT)) {
            console.error('作業終了時間の形式に誤りがある。');
            throw new Error('Date format is incorrect');
        }

        if (!moment(timestamp).isValid()) {
            console.error('存在しない日付が渡された。');
            throw new Error('Date does not exist');
        }

        this._value = timestamp;
    }

    public get value(): string {
        return this._value;
    }
}