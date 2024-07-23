import EnumBase from "src/common/utils/enums/base";
import {translate} from "src/common/utils/helper";

export default class TransactionWithdrawType extends EnumBase {
    static VSD = this._initEnum("2211", translate(`TransactionWithdrawType.VSD`));
    static VPB = this._initEnum("2295", translate(`TransactionWithdrawType.VPB`));
}
