<template>
    <div class="column is-three-quarter content">
        <FormTask />
        <div class="list">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="text" placeholder="Digite para filtrar" v-model="filter">
                    <span class="icon is-small is-left">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div>
            <TaskItem v-for="task in tasks" :key="task.id" :task="task" @whenDeleteTask="deleteTask"
                @whenClickedTask="clickedTask" />

            <BoxCard v-if="tasksIsEmpty">
                Você não está muito produtivo hoje :(
            </BoxCard>
            <ModalTask :show="task != null">
                <template v-slot:header>
                    <p class="modal-card-title">Modal title</p>
                    <button class="delete" aria-label="close" @click="closeModal"></button>
                </template>
                <template v-slot:section>
                    <div class="field">
                        <label for="description" class="label"> Descrição </label>
                        <input type="text" class="input" v-model="task.description" id="description">
                    </div>
                </template>
                <template v-slot:footer>
                    <button class="button is-success" @click="updateTask">Alterar Tarefa</button>
                    <button class="button" @click="closeModal">Cancelar</button>
                </template>
            </ModalTask>
        </div>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import FormTask from '../components/FormTask.vue'
import TaskItem from '../components/TaskItem.vue';
import BoxCard from '../components/BoxCard.vue';
import ModalTask from '../components/ModalTask.vue';
import { useStore } from '@/store';
import { DELETE_TASKS } from '@/store/typesMutations';
import { ALTER_TASK, GET_PROJECTS, GET_TASKS } from '@/store/typeActions';
import ITask from '@/interfaces/ITask';

export default defineComponent({
    name: 'VTasks',
    components: {
        FormTask,
        BoxCard,
        TaskItem,
        ModalTask
    },
    data() {
        return {
            task: null as ITask | null
        }
    },
    computed: {
        tasksIsEmpty(): boolean {
            return this.tasks.length === 0
        }
    },
    methods: {
        deleteTask(description: string) {
            this.store.commit(DELETE_TASKS, description)
        },
        clickedTask(ctask: ITask) {
            this.task = ctask
        },
        closeModal() {
            this.task = null
        },
        updateTask() {
            this.store.dispatch(ALTER_TASK, this.task)
                .then(() => this.closeModal())
        }
    },
    setup() {
        const store = useStore();
        const filter = ref('');

        store.dispatch(GET_TASKS);
        store.dispatch(GET_PROJECTS);

        // const tasks = computed(() => store.state.task.tasks.filter(t => !filter.value || t.description.includes(filter.value)));

        watchEffect(() => {
            store.dispatch(GET_TASKS, filter.value)
        })
        return {
            store,
            tasks: computed(() => store.state.task.tasks),
            filter
        }
    }
});
</script>
  
<style></style>
  