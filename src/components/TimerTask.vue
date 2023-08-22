<template>
    <section>
        <strong class="display-timer"> {{ elapsedTime }} </strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TimerTask',
    props: {
        seconds: {
            type: Number,
            default: 0

        }
    },
    computed: {
        elapsedTime() : string {
            return new Date(this.seconds * 1000).toISOString().substr(11,8)
        }
    }
})
</script>

<style scoped>
.display-timer {
    color: var(--text-primary);
}
</style>