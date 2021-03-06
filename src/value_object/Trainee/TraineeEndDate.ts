import * as moment from 'moment';
import { BaseValueObject } from "../BaseValueObject";

export class TraineeEndDate extends BaseValueObject {

    private readonly _value: string;
    private readonly DATE_FORMAT = /(19[0-9]{2}|2[0-9]{3})-\d{2}-\d{2} 23:59:59/;

    constructor(timestamp: string | null | undefined) {
        super();

        if (!timestamp) {
            console.error('研修終了日の値がnullまたはundefined');
            throw new Error('Passed value null or undefined');
        }

        if (this.isHalfWidthSpaceOrFullWidthSpaceOnly(timestamp)) {
            console.error('研修終了日の値が半角または全角スペースのみ');
            throw new Error('Passed value Half Width Space or Full Width Space');
        }

        if (!this.isValueFormatValid(timestamp, this.DATE_FORMAT)) {
            console.error('日付の形式に誤りがある。');
            throw new Error('Date format is incorrect');
        }

        if (!moment(timestamp).isValid()) {
            console.error('存在しない日付が渡された。');
            throw new Error('Date does not exist');
        }

        this._value = timestamp;
    }

    public get value() {
        return this._value;
    }

}