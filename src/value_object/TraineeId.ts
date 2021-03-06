import { BaseValueObject } from "./BaseValueObject";

export class TraineeId extends BaseValueObject {

    private readonly _value: string;

    constructor(id: string | null | undefined) {
        super();

        if (!id) {
            console.error('研修受講者IDの値が空文字、null、undefined');
            throw new Error('Passed value empty or null or undefined');
        }

        if (this.isHalfWidthSpaceOrFullWidthSpaceOnly(id)) {
            console.error('研修受講者IDの値が半角または全角スペースのみ');
            throw new Error('Passed value Half Width Space or Full Width Space');
        }

        this._value = id;
    }

    public get value() {
        return this._value;
    }

}