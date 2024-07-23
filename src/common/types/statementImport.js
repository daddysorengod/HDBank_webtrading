import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class StatementImportType extends EnumBase {
    static CUSTOMER_1 = this._initEnum(1, `StatementImportType.CUSTOMER_1`);
    static CUSTOMER_2 = this._initEnum(2, `StatementImportType.CUSTOMER_2`);
}
