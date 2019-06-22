import { BaseValueObject } from "./BaseValueObject";

export class YearMonthDay extends BaseValueObject {

    private readonly _value: string;
    private readonly TIME_BEGINNING_ONE_DAY = '00:00:00';
    private readonly YEAR_MONTH_DAY_FORMAT = /(19[0-9]{2}|2[0-9]{3})-\d{2}-\d{2}/;
    private readonly STRING_LENGTH = 10;

    constructor(yearMonthDay: string | null | undefined) {
        super();

        if (!yearMonthDay) {
            console.error('年月日の値がnullまたはundefined');
            throw new Error('Passed value null or undefined');
        }

        if (this.isHalfWidthSpaceOrFullWidthSpaceOnly(yearMonthDay)) {
            console.error('年月日の値が半角または全角スペースのみ');
            throw new Error('Passed value Half Width Space or Full Width Space');
        }

        if (!this.isValueFormatValid(yearMonthDay, this.YEAR_MONTH_DAY_FORMAT)) {
            console.error('年月日の形式に誤りがある。');
            throw new Error('YearMonthDay format is incorrect');
        }

        if (this.isExceededDefaultLength(yearMonthDay, this.STRING_LENGTH)) {
            console.error('年月日の形式に誤りがある。');
            throw new Error('YearMonthDay is too long');
        }

        this._value = `${yearMonthDay} ${this.TIME_BEGINNING_ONE_DAY}`;
    }

    public get value(): string {
        return this._value;
    }
}