import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class StockType extends EnumBase {
    static WAITING_TRANSACTION = this._initEnum("12", translate(`StockType.WAITING_TRANSACTION`));
    static TRANSACTION = this._initEnum("13", translate(`StockType.TRANSACTION`));
}
