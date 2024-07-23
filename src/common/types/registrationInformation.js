import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class RegistrationInformation extends EnumBase {
    static Option1 = this._initEnum("1", translate(`RegistrationInformation.Option1`));
    static Option2 = this._initEnum("2",translate(`RegistrationInformation.Option2`));
    static Option3 = this._initEnum("3", translate(`RegistrationInformation.Option3`));
}
