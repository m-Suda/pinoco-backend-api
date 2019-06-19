import * as moment from 'moment';

export class TraineeEndDate {

    private readonly _value: string;
    private readonly DATE_FORMAT = /(19[0-9]{2}|2[0-9]{3})-\d{2}-\d{2} 23:59:59/;

    constructor(timestamp: string) {

        if (!this.isEndDateFormatValid(timestamp)) {
            console.error('日付の形式に誤りがある。');
            throw new Error('Date format is incorrect');
        }

        if (!moment(timestamp).isValid()) {
            console.error('存在しない日付が渡された。');
            throw new Error('Date does not exist');
        }

        this._value = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }

    public get value() {
        return this._value;
    }

    /**
     * 終了日の形式が正しい
     * @param timestamp
     */
    private isEndDateFormatValid(timestamp: string) {
        return !!(timestamp.match(this.DATE_FORMAT));
    }

}