import EnumBase from "src/common/utils/enums/base";

export default class LookupStatementStatus extends EnumBase {
    static WAITING = this._initEnum(1, `LookupStatementStatus.WAITING`);
    static APPROVED = this._initEnum(2, `LookupStatementStatus.APPROVED`);
    static WAITING_CONFIRM = this._initEnum(
        3,
        `LookupStatementStatus.WAITING_CONFIRM`
    );
    static REJECT = this._initEnum(4, `LookupStatementStatus.REJECT`);
    static WAITING_ACTION = this._initEnum(
        5,
        `LookupStatementStatus.WAITING_ACTION`
    );
    static MATCHING = this._initEnum(6, `LookupStatementStatus.MATCHING`);
    static MATCHING_ALL = this._initEnum(
        7,
        `LookupStatementStatus.MATCHING_ALL`
    );
    static CANCEL = this._initEnum(8, `LookupStatementStatus.CANCEL`);
    static PAY = this._initEnum(9, `LookupStatementStatus.PAY`);
    static EXPIRE = this._initEnum(10, `LookupStatementStatus.EXPIRE`);
}
