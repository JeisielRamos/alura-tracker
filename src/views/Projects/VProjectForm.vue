<template>
    <section>
        <form @submit.prevent="saveProject">
            <div class="field">
                <label for="projectName" class="label"> Nome do projeto </label>
                <input type="text" class="input" v-model="projectName" id="projectName">
            </div>
            <div class="fiel">
                <button class="button" type="submit"> Salvar </button>
            </div>
        </form>
    </section>
</template>
<script lang="ts">

import { computed, defineComponent } from 'vue';
import { useStore } from '../../store'
import { TypeNotification } from '@/interfaces/INotifications';
import { notificationMixin } from '@/mixins/notify';
import { ALTER_PROJECTS, REGISTER_PROJECTS } from '@/store/typeActions';

export default defineComponent({
    name: 'VProjectForm',
    props: {
        id: {
            type: String
        }
    },
    mixins: [notificationMixin],
    mounted() {
        if (this.id) {
            const project = this.store.state.projects.find(p => p.id == this.id)
            this.projectName = project?.name || ''
        }
    },
    data() {
        return {
            projectName: ""
        };
    },
    methods: {
        saveProject() {
            if (this.id) {
                this.store.dispatch(ALTER_PROJECTS, {
                    id: this.id,
                    name: this.projectName
                })
                    .then(() => this.dispatchSuccess())
                    .catch((response) => {
                        this.notify(TypeNotification.DANGER, 'Erro ao alterar Projeto!', response.message)
                    })
            } else {
                this.store.dispatch(REGISTER_PROJECTS, this.projectName)
                    .then(() => this.dispatchSuccess())
                    .catch((response) => {
                        this.notify(TypeNotification.DANGER, 'Erro ao salvar Projeto!', response.message)
                    })
            }

        },
        dispatchSuccess() {
            this.notify(TypeNotification.SUCCESS, 'Novo projeto salvo!', 'O projeto ' + this.projectName + ' esta disponivel')
            this.projectName = "";
            this.$router.push('/projetos')
        }
    },
    setup() {
        const store = useStore()
        return {
            store,
            projects: computed(() => store.state.projects)
        }
    }
})
</script>