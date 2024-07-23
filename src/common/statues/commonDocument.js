import EnumBase from "src/common/utils/enums/base";
import { translate } from "src/common/utils/helper";

export default class CommonDocument extends EnumBase {
    static DOCUMENT_1 = this._initEnum(
        "01",
        translate(`DOCUMENT_TYPE.DOCUMENT_1`)
    );
    static DOCUMENT_2 = this._initEnum(
        "02",
        translate(`DOCUMENT_TYPE.DOCUMENT_2`)
    );
    static DOCUMENT_3 = this._initEnum(
        "03",
        translate(`DOCUMENT_TYPE.DOCUMENT_3`)
    );
    static DOCUMENT_4 = this._initEnum(
        "04",
        translate(`DOCUMENT_TYPE.DOCUMENT_4`)
    );
}
