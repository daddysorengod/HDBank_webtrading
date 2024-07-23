<template>
    <q-layout>
        <q-page-container>
            <q-page class="vpb-auth">
                <router-view />
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "AuthLayout",
});
</script>

<style scoped></style>
