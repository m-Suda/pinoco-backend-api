import { BaseValueObject } from "./BaseValueObject";

export class CompanyId extends BaseValueObject {

    private readonly _value: string;
    private readonly STRING_LENGTH = 24;
    private readonly COMPANY_FORMAT = /^[a-zA-Z0-9-_]*$/;

    constructor(id: string | null | undefined) {
        super();

        if (!id) {
            console.error('企業IDの値が空文字、null、undefined');
            throw new Error('Passed value empty or null or undefined');
        }

        if (this.isHalfWidthSpaceOrFullWidthSpaceOnly(id)) {
            console.error('企業IDの値が半角または全角スペースのみ');
            throw new Error('Passed value Half Width Space or Full Width Space');
        }

        if (this.isExceededDefaultLength(id, this.STRING_LENGTH)) {
            console.error('企業IDが既定の文字数を超過している。');
            throw new Error('CompanyId is too long');
        }

        if (!this.isValueFormatValid(id, this.COMPANY_FORMAT)) {
            console.error('企業IDの形式に誤りがある。');
            throw new Error('CompanyId format is incorrect');
        }

        this._value = id;
    }

    public get value() {
        return this._value;
    }

}