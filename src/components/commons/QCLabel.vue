<template>
    <div class="qc-label">
        <span class="qc-label--text">{{ $t(label) }}</span>
        <span v-if="required" class="qc-label--required text-negative">*</span>
    </div>
</template>

<script>
export default {
    name: "QCLabel",
    props: {
        required: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped></style>
