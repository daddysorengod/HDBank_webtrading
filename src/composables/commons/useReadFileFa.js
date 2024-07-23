import { ref } from "vue";
import * as XLSX from "xlsx/xlsx.mjs";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";

export default function useReadFileFa(data, target, callback) {
    const loadingFile = ref(false);
    // const sizeAllow = ref(20);
    const fileData = ref([]);
    const file = ref(null);
    const fileInvalid = ref({
        status: false,
        message: "",
    });
    const fileDoInvalid = ref({
        status: false,
        message: [],
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

        // if (file.value.size > sizeAllow.value * 1048576) {
        //     fileInvalid.value = {
        //         status: true,
        //         message: t("importFile.fileSize2"),
        //     };
        //     return;
        // }

        loadingFile.value = true;

        setTimeout(() => {
            const reader = new FileReader();

            try {
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

                        const sheetNames = workbook.SheetNames;
                        const sheetData = [];

                        for (const sheetName of sheetNames) {
                            const sheet = workbook.Sheets[sheetName];
                            const data = XLSX.utils.sheet_to_json(sheet, {
                                header: 1,
                                raw: true,
                                defval: "",
                            });
                            sheetData.push(data);
                        }

                        fileData.value = sheetData;

                        validateFnc(fileData.value);
                    } catch (e) {
                        console.error(e);
                    }

                    loadingFile.value = false;
                };

                if (fileName.endsWith("csv")) {
                    reader.readAsText(file.value, "UTF-8");
                } else {
                    reader.readAsBinaryString(file.value);
                }
            } catch (e) {
                loadingFile.value = false;
            }
        }, 2000);
    };

    return {
        fileData,
        fileInvalid,
        fileDoInvalid,
        handleImport,
        loadingFile,
    };
}
