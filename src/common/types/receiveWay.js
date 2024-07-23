import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class ReceiveWay extends EnumBase {
    static ReceiveWay_fromVPB = this._initEnum(translate(`ReceiveWay.ReceiveWay_fromVPB`), translate(`ReceiveWay.ReceiveWay_fromVPB`));
    static ReceiveWay_fromPost = this._initEnum(translate(`ReceiveWay.ReceiveWay_fromPost`), translate(`ReceiveWay.ReceiveWay_fromPost`));
}
