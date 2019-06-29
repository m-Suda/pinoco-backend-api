export class ProgressDegrees {

    private readonly _value: number;
    private readonly MINIMUM = 1;
    private readonly MAX = 3;

    constructor(degrees: number) {

        if (degrees < this.MINIMUM) {
            console.error('理解度が既定値を下回っている。');
            throw new Error('ProgressDegrees is lower than default value');
        }

        if (degrees > this.MAX) {
            console.error('理解度が既定値を超えている。');
            throw new Error('ProgressDegrees is outside the default range');
        }

        this._value = degrees;
    }

    public get value() {
        return this._value;
    }
}