import EnumBase from "src/common/utils/enums/base";

export default class LookupOwnerPermissionStatus extends EnumBase {
    static WAITING = this._initEnum(
        "01",
        `LookupOwnerPermissionStatus.WAITING`
    );
    static APPROVED = this._initEnum(
        "02",
        `LookupOwnerPermissionStatus.APPROVED`
    );
    static REPORTED = this._initEnum(
        "03",
        `LookupOwnerPermissionStatus.REPORTED`
    );
    static RIGHT_ALLOCATED = this._initEnum(
        "04",
        `LookupOwnerPermissionStatus.RIGHT_ALLOCATED`
    );
    static RIGHT_REPORTED = this._initEnum(
        "05",
        `LookupOwnerPermissionStatus.RIGHT_REPORTED`
    );
    static DONE = this._initEnum("06", `LookupOwnerPermissionStatus.DONE`);
    static ALLOCATION_PENDING = this._initEnum(
        "07",
        `LookupOwnerPermissionStatus.ALLOCATION_PENDING`
    );
    static COMPLETED = this._initEnum(
        "08",
        `LookupOwnerPermissionStatus.COMPLETED`
    );
    static REJECT = this._initEnum("09", `LookupOwnerPermissionStatus.REJECT`);
    static WAITING_STOCK = this._initEnum(
        "10",
        `LookupOwnerPermissionStatus.WAITING_STOCK`
    );
    static APPROVED_STOCK = this._initEnum(
        "11",
        `LookupOwnerPermissionStatus.APPROVED_STOCK`
    );
}
