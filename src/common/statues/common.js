import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class CommonStatus extends EnumBase {
    static WAITING = this._initEnum("N", `CommonStatus.WAITING`);
    static REJECT = this._initEnum("R", `CommonStatus.REJECT`);
    static APPROVED = this._initEnum("A", `CommonStatus.APPROVED`);
}
