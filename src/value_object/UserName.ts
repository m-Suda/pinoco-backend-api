/**
 * ユーザー名オブジェクト
 * stringまたはundefined, nullを許容。
 * undefined, nullの場合は空文字が入る。
 */
import { BaseValueObject } from "./BaseValueObject";

export class UserName extends BaseValueObject {

    private readonly _value: string;
    private readonly STRING_LENGTH = 64;

    constructor(username: string | undefined | null) {
        super();

        if (!username) {
            this._value = '';
            return;
        }

        if (this.isExceededDefaultLength(username)) {
            console.error('ユーザー名が既定の文字数を超過している。');
            throw new Error('UserName is too long');
        }

        if (this.isIncludedIllegalCharacter(username)) {
            console.error(`ユーザー名に禁則文字が含まれている。`);
            throw new Error('Used illegal character');
        }

        this._value = username || '';
    }

    public get value() {
        return this._value;
    }

    /**
     * ユーザー名が既定の文字数を超えている。
     * @param username
     * @return boolean
     */
    private isExceededDefaultLength(username: string): boolean {
        return username.length > this.STRING_LENGTH;
    }
}