<template>
    <router-view />
</template>

<script>
import { defineComponent } from "vue";
import moment from "moment";

export default defineComponent({
    name: "App",
    setup() {

        const maxTimeBlur = process.env.VUE_APP_MAX_TIME_BLUR * 60 * 1000;

        let timeBlur = null;

        window.addEventListener("focus", function(event)
        {
            const now = moment().valueOf();

            if (timeBlur && (now - timeBlur > maxTimeBlur))
                window.location.reload();

            timeBlur = null;

            console.log('blur at ', moment(timeBlur).format('YYYY-MM-DD HH:mm:ss'));
            console.log('focus current ', moment().format('YYYY-MM-DD HH:mm:ss'));
        }, false);

        window.addEventListener("blur", function(event)
        {
            timeBlur = moment().valueOf();

            console.log('blur current', moment().format('YYYY-MM-DD HH:mm:ss'));
        }, false);
    }
});
</script>
