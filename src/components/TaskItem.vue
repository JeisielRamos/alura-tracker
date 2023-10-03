<template>
    <BoxCard>
        <div class="columns clicked" @click="clickedTask">
            <div class="column is-4">
                {{ task.description || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ task.project?.name || 'N/D' }}
            </div>
            <div class="column">
                <TimerTask :seconds="task.seconds" />
            </div>

            <button class="button ml-2 is-danger" @click="deleteTask(task.description)">
                <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                </span>
            </button>
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
    },
    methods: {
        deleteTask(description: string) {
            this.$emit('whenDeleteTask', description)
        },
        clickedTask() {
            this.$emit('whenClickedTask', this.task)
        }
    },
    emits: ['whenDeleteTask','whenClickedTask']
})
</script>

<style scoped>
.clicked {
    cursor: pointer;
}
</style>