<template>
    <div class="qc-pagination">
        <span class="qc-per-page-label">{{ paginationI18n.display }}:</span>

        <q-select
            class="qc-per-page-options"
            v-model="rowsPerPageModel"
            :options="rowsPerPageOptions"
            options-dense
            borderless
            dense
        ></q-select>

        <q-pagination
            v-model="currentPageModel"
            :max="lastPageRef"
            :max-pages="6"
            direction-links
            dense
            size="md"
            boundary-numbers
        />

        <span class="qc-pagination-total"
            >{{ paginationI18n.totalRecord }}: {{ totalRef }}</span
        >
    </div>
</template>

<script>
import { defineComponent, ref, watch, computed, toRef } from "vue";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";

export default defineComponent({
    name: "QCPagination",
    computed: {
        paginationI18n() {
            const dataLocale = {
                totalRecord: this.$t("commonLabel.totalRecord"),
                display: this.$t("commonLabel.display"),
            };
            return dataLocale;
        },
    },
    props: {
        rowsPerPageLabel: {
            type: String,
            default: () => "commonLabel.display" ?? "Hiển thị",
        },
        rowsPerPageOptions: {
            type: Array,
            default: () => [1, 5, 10, 20, 50],
        },
        total: {
            type: Number,
            required: true,
        },
        rowsPerPage: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        lastPage: {
            type: Number,
            required: true,
        },
    },
    setup(props, { emit }) {
        const rowsPerPageRef = toRef(props, "rowsPerPage");
        const currentPageRef = toRef(props, "currentPage");
        const lastPageRef = toRef(props, "lastPage");
        const totalRef = toRef(props, "total");

        const { t } = useI18n();

        const dataLocale = {
            totalRecord: "commonLabel.totalRecord",
            display: "commonLabel.display",
        };

        const currentPageModel = computed({
            get: () => currentPageRef.value,
            set: (val) => emit("change-pagination", { currentPage: val }),
        });

        const rowsPerPageModel = computed({
            get: () => rowsPerPageRef.value,
            set: (val) => emit("change-pagination", { rowsPerPage: val }),
        });

        return {
            rowsPerPageRef,
            currentPageRef,
            lastPageRef,
            totalRef,
            rowsPerPageModel,
            currentPageModel,
            dataLocale,
        };
    },
});
</script>

<style scoped>
.qc-pagination {
    display: flex;
    align-items: center;
}

.qc-per-page-label {
    font-size: 12px;
    margin-right: 16px;
}

.qc-per-page-options {
    margin-right: 16px;
}

.qc-pagination-total {
    margin-left: 16px;
}
</style>
