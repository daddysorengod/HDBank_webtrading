<template>
    :text-color="activated ? 'primary' : 'grey-9'"
    <q-tabs v-model="tab" class="text-teal">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
    </q-tabs>
</template>

<script>
import { defineComponent } from "vue";
import useActivatedRoute from "src/composables/commons/useActivatedRoute";

export default defineComponent({
    name: "ItemHorizonMenu",
    props: {
        route: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { activated } = useActivatedRoute(props.route);

        return {
            activated,
        };
    },
});
</script>

<style scoped></style>
