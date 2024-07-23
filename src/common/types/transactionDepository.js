import EnumBase from "src/common/utils/enums/base";
import {translate} from "src/common/utils/helper";

export default class TransactionDepositoryType extends EnumBase {
    static VSD = this._initEnum("2201", translate(`TransactionDepositoryType.VSD`));
    static VPB = this._initEnum("2291", translate(`TransactionDepositoryType.VPB`));
}
