<template>
    <q-btn round dense flat color="black" icon="o_notifications">
        <q-badge color="red" floating rounded>5</q-badge>
        <q-menu max-width="350px">
            <q-list bordered class="rounded-borders">
                <q-item-label header>Friends</q-item-label>

                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label lines="1"
                            >Brunch this weekend?</q-item-label
                        >
                        <q-item-label caption lines="2">
                            <span class="text-weight-bold">Janet</span>
                            -- I'll be in your neighborhood doing errands this
                            weekend. Do you want to grab brunch?
                        </q-item-label>
                    </q-item-section>

                    <q-item-section side top> 1 min ago </q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script>
export default {
    name: "Notify",
};
</script>

<style scoped></style>
