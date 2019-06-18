export class BaseValueObject {

    constructor() { }

    /**
     * 禁則文字が含まれている。
     * @param str
     * @return boolean
     */
    protected isIncludedIllegalCharacter(str: string): boolean {
        return !!(str.match(/[<>"'&|%\\]/));
    }

}