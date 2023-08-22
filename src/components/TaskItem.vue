<template>
    <BoxCard>
        <div class="columns">
            <div class="column is-7">
                {{ task.description || 'Tarefa sem descrição' }}
            </div>
            <div class="column">
                <TimerTask :seconds="task.seconds" />
            </div>
        </div>
    </BoxCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TimerTask from './TimerTask.vue';
import ITask from '../interfaces/ITask';
import BoxCard from './BoxCard.vue';

export default defineComponent({
    name: 'TaskItem',
    components: {
        TimerTask,
        BoxCard
    },
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    }
})
</script>