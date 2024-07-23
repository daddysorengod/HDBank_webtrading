import EnumBase from "src/common/utils/enums/base";
import {translate} from "src/common/utils/helper";

export default class OrderAfmastType extends EnumBase {
    static ORDER = this._initEnum("3331", translate(`OrderAfmastType.OrderAfmast`));
}
