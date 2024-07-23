import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class OrderByTime extends EnumBase {
    static ASCENDING = this._initEnum("asc", `orderbyTime.ASCENDING`);
    static DECREASE = this._initEnum("desc", `orderbyTime.DECREASE`);
}
