import * as moment from 'moment';

/**
 * DB操作者クラス
 */
export class DBOperator {

    private readonly _createUser: string;
    private readonly _createDate: string;
    private readonly _updateUser: string;
    private readonly _updateDate: string;

    constructor(operatorId: string) {
        this._createUser = operatorId;
        this._updateUser = operatorId;
        const now = moment().format('YYYYMMDDHHmmss');
        this._createDate = now;
        this._updateDate = now;
    }

    public get createUser(): string {
        return this._createUser;
    }

    public get createDate(): string {
        return this._createDate;
    }

    public get updateUser(): string {
        return this._updateUser;
    }

    public get updateDate(): string {
        return this._updateDate;
    }
}