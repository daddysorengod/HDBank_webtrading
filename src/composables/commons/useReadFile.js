import { ref } from "vue";
import * as XLSX from "xlsx/xlsx.mjs";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";

export default function useReadFile(data, target, callback) {
    const loadingFile = ref(false);
    const sizeAllow = ref(20);
    const fileData = ref([]);
    const file = ref(null);
    const fileInvalid = ref({
        status: false,
        message: "",
    });
    const { t } = useI18n();

    const handleImport = (fileImport, validateFnc) => {
        fileInvalid.value = {
            status: false,
            message: "",
        };

        file.value = fileImport;

        const fileName = file.value.name.toLowerCase();

        if (!fileName.endsWith("xls") && !fileName.endsWith("xlsx")) {
            fileInvalid.value = {
                status: true,
                message: t("importFile.fileFormat"),
            };
            return;
        }

        // if (fileName.endsWith('csv') && file.value.size > sizeAllow.value * 1048576) {
        //     fileInvalid.value = {
        //         status: true,
        //         message: 'Kích cỡ file vượt quá cho phép đối với file .csv'
        //     }
        //     return
        // }

        if (file.value.size > sizeAllow.value * 1048576) {
            fileInvalid.value = {
                status: true,
                message: t("importFile.fileSize2"),
            };
            return;
        }

        loadingFile.value = true;

        setTimeout(() => {
            const reader = new FileReader();

            try {
                if (fileName.endsWith("csv")) {
                    reader.readAsText(file.value, "UTF-8");
                } else {
                    reader.readAsBinaryString(file.value);
                }

                reader.onload = async (e) => {
                    try {
                        const result = e.target.result;

                        let workbook = null;

                        if (fileName.endsWith("csv")) {
                            workbook = XLSX.read(result, {
                                type: "string",
                                raw: true,
                            });
                        } else {
                            workbook = XLSX.read(result, {
                                type: "binary",
                                raw: true,
                                cellDates: true,
                                cellNF: false,
                                cellText: false,
                            });
                        }

                        fileData.value = XLSX.utils.sheet_to_json(
                            workbook.Sheets[workbook.SheetNames[0]],
                            { header: 1, raw: true, defval: "" }
                        );

                        validateFnc(fileData.value);
                    } catch (e) {
                        console.error(e);
                    }

                    loadingFile.value = false;
                };
            } catch (e) {
                loadingFile.value = false;
            }
        }, 2000);
    };

    return {
        fileData,
        fileInvalid,
        handleImport,
        loadingFile,
    };
}
