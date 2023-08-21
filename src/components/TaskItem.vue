<template>
    <div class="box has-text-weight-bold">
        <div class="columns">
            <div class="column is-7">
                {{ task.description }}
            </div>
            <div class="column">
                <TimerTask :seconds="task.seconds" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TimerTask from './TimerTask.vue';
import ITask from '../interfaces/ITask';

export default defineComponent({
    name: 'TaskItem',
    components: {
        TimerTask
    },
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    }
})
</script>

<style scoped>
.box {
    background: #FAF0CA;
}
</style>