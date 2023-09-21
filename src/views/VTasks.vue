<template>
    <div class="column is-three-quarter content">
        <FormTask />
        <div class="list">
            <TaskItem v-for="(task, idx) in tasks" :key="idx" :task="task"  @whenDeleteTask="deleteTask" />
            <BoxCard v-if="tasksIsEmpty">
                Você não está muito produtivo hoje :(
            </BoxCard>
        </div>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormTask from '../components/FormTask.vue'
import TaskItem from '../components/TaskItem.vue';
import BoxCard from '../components/BoxCard.vue';
import { useStore } from '@/store';
import { DELETE_TASKS } from '@/store/typesMutations';

export default defineComponent({
    name: 'VTasks',
    components: {
        FormTask,
        BoxCard,
        TaskItem
    },
    computed: {
        tasksIsEmpty(): boolean {
            return this.tasks.length === 0
        }
    },
    methods: {
        deleteTask(description: string) {            
            this.store.commit(DELETE_TASKS, description)
        }
    },
    setup() {
        const store = useStore()
        return {
            store,
            tasks:  computed(() => store.state.tasks)
        }
    }
});
</script>
  
<style>

</style>
  