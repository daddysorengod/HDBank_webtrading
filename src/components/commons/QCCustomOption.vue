<template>
    <q-item>
        <q-item-section>
            <q-item-label>{{ label }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="editable" side>
            <q-icon name="edit" size="xs" @click.stop="emitEdit(value)" />
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    name: "QCCustomOption",
    props: {
        label: [String],
        value: [String, Number],
        editable: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["click:editable"],
    setup(props, { emit }) {
        const emitEdit = (val) => emit("click:editable", val);

        return {
            emitEdit,
        };
    },
};
</script>

<style scoped></style>
