<template>
    <template v-if="disabled">
        <q-input
        class="q-field-disabled row no-wrap items-start q-field--outlined q-input q-field--with-bottom"
        v-model="date"
        mask="##/##/####"
        :error="!!errorMessage"
        :error-message="errorMessage"
        :disable="disabled"
        :placeholder="$t(placeholder)"
    >
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                >
                    <q-date v-model="date" mask="DD/MM/YYYY" minimal>
                        <div class="row items-center justify-end">
                            <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                            />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
    </template>

    <template v-else>
        <q-input
        class="q-field row no-wrap items-start q-field--outlined q-input q-field--with-bottom"
        v-model="date"
        mask="##/##/####"
        :error="!!errorMessage"
        :error-message="errorMessage"
        :disable="disabled"
        :placeholder="$t(placeholder)"
    >
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                >
                    <q-date v-model="date" mask="DD/MM/YYYY" minimal>
                        <div class="row items-center justify-end">
                            <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                            />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
    </template>
    
</template>

<script>
import { defineComponent } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
    name: "QCDatePicker",
    props: {
        name: {
            type: String,
            default: "date",
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const { value: date, errorMessage } = useField(props.name);

        return {
            date,
            errorMessage,
        };
    },
});
</script>

<style scoped></style>
