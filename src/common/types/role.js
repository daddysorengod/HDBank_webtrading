import EnumBase from "src/common/utils/enums/base";

export default class RoleType extends EnumBase {
    static ADMIN = this._initEnum("A", `RoleType.ADMIN`);
    static MAJOR = this._initEnum("M", `RoleType.MAJOR`);
}
