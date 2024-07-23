import EnumBase from "src/common/utils/enums/base";

export default class OwnerPermissionStatus extends EnumBase {
    static SHARED = this._initEnum("1");
    static CLOSED = this._initEnum("2");
}
