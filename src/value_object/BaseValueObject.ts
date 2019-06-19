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

    /**
     * 渡された文字列は半角スペースまたは全角スペースのみである。
     * @param str
     */
    protected isHalfWidthSpaceOrFullWidthSpaceOnly(str: string) {
        return str === ' ' || str === '　';
    }

    /**
     * 文字列が既定の文字数を超えている。
     * @param str
     * @param maxLength
     * @return boolean
     */
    protected isExceededDefaultLength(str: string, maxLength: number): boolean {
        return str.length > maxLength;
    }

    /**
     * 値の形式が正しい
     * @param id
     * @param regexp
     */
    protected isValueFormatValid(id: string, regexp: RegExp) {
        return !!(id.match(regexp));
    }

}