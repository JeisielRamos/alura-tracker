<template>
    <div class="box form-task">
        <div class="columns ">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa.">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model="description">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProject">
                        <option value="">Selecione o projeto</option>
                        <option :value="project.id" v-for="project in projects" :key="project.id">
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column is-justify-content-space-between">
                <TimerForm @whenStopTimer="finishTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {  computed, defineComponent, ref } from 'vue';
import TimerForm from './TimerForm.vue';
import { useStore } from 'vuex';
import { key } from '@/store'
import { TypeNotification } from '@/interfaces/INotifications';
import useNotification from '@/hooks/notify'
import { REGISTER_TASKS } from '@/store/typeActions';

export default defineComponent({
    name: 'FormTask',
    components: {
        TimerForm
    },
    setup() {
        const store = useStore(key)
        const { notify } = useNotification()
        const projects = computed(()=>store.state.project.projects)
        const description = ref("")
        const idProject = ref("")

        
        const finishTask = (seconds: number): void => {
            const project = projects.value.find(p => p.id == idProject.value)
            if (!project) {
                notify(TypeNotification.DANGER,  'Ops!', 'Selecione um projeto antes de finalizar a tarefa')
                return;
            }
            store.dispatch(REGISTER_TASKS, {
                id:  store.state.task.tasks.length+1,
                seconds: seconds,
                description: description.value,
                project: project
            })
            description.value = ''
        }

        return {
            description,
            idProject,
            projects,
            finishTask
        }
    }
})
</script>

<style>
.form-task {
    color: var(--text-primary);
    background-color: var(--bg-primary);
}
</style>