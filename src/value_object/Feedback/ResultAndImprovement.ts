import { BaseValueObject } from "../BaseValueObject";

export class ResultAndImprovement extends BaseValueObject {

    private readonly _value: string;

    constructor(feedback: string | null | undefined) {
        super();

        if (!feedback) {
            this._value = '';
            return;
        }

        if (this.isIncludedIllegalCharacter(feedback)) {
            console.error(`ヒューマンフィードバックに禁則文字が含まれている。`);
            throw new Error('Used illegal character');
        }

        this._value = feedback;
    }

    public get value(): string {
        return this._value;
    }
}