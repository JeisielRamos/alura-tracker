<template>
    <div class="column is-three-quarter content">
        <FormTask @whenSaveTask="saveTask" />
        <div class="list">
            <TaskItem v-for="(task, idx) in tasks" :key="idx" :task="task" />
            <BoxCard v-if="tasksIsEmpty">
                Você não está muito produtivo hoje :(
            </BoxCard>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import FormTask from '../components/FormTask.vue'
import TaskItem from '../components/TaskItem.vue';
import BoxCard from '../components/BoxCard.vue';
import ITask from '../interfaces/ITask'

export default defineComponent({
    name: 'VTasks',
    components: {
        FormTask,
        BoxCard,
        TaskItem
    },
    data() {
        return {
            tasks: [] as ITask[]
        }
    },
    computed: {
        tasksIsEmpty(): boolean {
            return this.tasks.length === 0
        }
    },
    methods: {
        saveTask(task: ITask) {
            this.tasks.push(task)
        }
    }
});
</script>
  
<style>

</style>
  