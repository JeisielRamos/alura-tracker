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
import { computed, defineComponent } from 'vue';
import TimerForm from './TimerForm.vue';
import { useStore } from 'vuex';
import { key } from '@/store'
import { ADD_TASKS } from '@/store/typesMutations';
import { TypeNotification } from '@/interfaces/INotifications';
import useNotification from '@/hooks/notify'

export default defineComponent({
    name: 'FormTask',
    components: {
        TimerForm
    },
    data() {
        return {
            description: '',
            idProject: ''
        }
    },
    methods: {
        finishTask(seconds: number): void {
            const project = this.projects.find(p => p.id == this.idProject)
            if (!project) {
                this.notify(TypeNotification.DANGER,  'Ops!', 'Selecione um projeto antes de finalizar a tarefa')
                return;
            }
            this.store.commit(ADD_TASKS, {
                seconds: seconds,
                description: this.description,
                project: project
            })
            this.description = ''
        }
    },
    setup() {
        const store = useStore(key)
        const { notify } = useNotification()
        return {
            store,
            projects: computed(() => store.state.projects),
            notify
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