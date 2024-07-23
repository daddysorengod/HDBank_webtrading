import EnumBase from "src/common/utils/enums/base";

export default class GenderType extends EnumBase {
    static MALE = this._initEnum("MALE");
    static FEMALE = this._initEnum("FEMALE");
}
