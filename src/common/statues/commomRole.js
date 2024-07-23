import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class CommonRole extends EnumBase {
    static MAJOR = this._initEnum('M', translate(`RoleType.MAJOR`));
    static ADMIN = this._initEnum('A', translate(`RoleType.ADMIN`));
}