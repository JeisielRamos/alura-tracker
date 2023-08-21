<template >
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <TimerTask :seconds="seconds" />

        <ButtonTask @clicked="start" :disabled="timerStarted" icon="fas fa-play" text="play"  />
        <ButtonTask @clicked="stop" :disabled="!timerStarted" icon="fas fa-stop" text="stop"  />

  
    </div>
</template>

<script  lang="ts">
import { defineComponent } from 'vue'
import TimerTask from './TimerTask.vue'
import ButtonTask from './ButtonTask.vue'

export default defineComponent({
    name: 'TimerForm',
    emits: ['whenStopTimer'],
    components: {
        TimerTask,
        ButtonTask
    },
    data() {
        return {
            seconds: 0,
            timer: 0,
            timerStarted: false
        }
    },  
    methods: {
        start () {
            this.timerStarted = true
            this.timer = setInterval(() => {
                this.seconds += 1
            }, 1000)
        },
        stop () {
            this.timerStarted = false
            clearInterval(this.timer)
            this.$emit('whenStopTimer', this.seconds)
            this.seconds = 0
        }
    }
})
</script>

<style></style>