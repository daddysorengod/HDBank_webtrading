import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class PlaceWithdrawType extends EnumBase {
    static VSD = this._initEnum("2211", translate(`PlaceWithdrawDepositoryType.VSD`));
    static VPB = this._initEnum("2295", translate(`PlaceWithdrawDepositoryType.VPB`));
}
