/**
 * DB操作者クラス
 */
export class DBOperator {

    private readonly _uid: string;

    constructor(operatorId: string) {
        this._uid = operatorId;
    }

    public get uid(): string {
        return this._uid;
    }
}