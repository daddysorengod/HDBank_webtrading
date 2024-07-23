import EnumBase from "src/common/utils/enums/base";

export default class StatementType extends EnumBase {
    static BUY = this._initEnum("B", `StatementType.BUY`);
    static SELL = this._initEnum("S", `StatementType.SELL`);
}
