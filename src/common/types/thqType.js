import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class ThqType extends EnumBase {
    static DIVIDEND_CASH = this._initEnum("01", `ThqType.DIVIDEND_CASH`);
    static DIVIDEND_STOCK = this._initEnum("02", `ThqType.DIVIDEND_STOCK`);
    static GIFT_STOCK = this._initEnum("03", `ThqType.GIFT_STOCK`);
    static SPLIT_STOCK = this._initEnum("04", `ThqType.SPLIT_STOCK`);
    static MERGE_STOCK = this._initEnum("05", `ThqType.MERGE_STOCK`);
    static BUY_STOCK = this._initEnum("06", `ThqType.BUY_STOCK`);
    static BUY_OTHER_STOCK = this._initEnum("07", `ThqType.BUY_OTHER_STOCK`);
    static EXCHANGE_BONDS = this._initEnum("08", `ThqType.EXCHANGE_BONDS`);
    static PAY_INTEREST = this._initEnum("09", `ThqType.PAY_INTEREST`);
    static SHAREHOLDER = this._initEnum("10", `ThqType.SHAREHOLDER`);
    static MEETING_SHAREHOLDER = this._initEnum(
        "11",
        `ThqType.MEETING_SHAREHOLDER`
    );
}
