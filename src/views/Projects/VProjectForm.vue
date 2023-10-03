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

import { defineComponent, ref } from 'vue';
import { useStore } from '../../store'
import { TypeNotification } from '@/interfaces/INotifications';
import { notificationMixin } from '@/mixins/notify';
import { ALTER_PROJECTS, REGISTER_PROJECTS } from '@/store/typeActions';
import { useRouter } from 'vue-router';
import  useNotify  from '@/hooks/notify';

export default defineComponent({
    name: 'VProjectForm',
    props: {
        id: {
            type: String
        }
    },
    mixins: [notificationMixin],
    setup(props) {
        const router = useRouter()
        const store = useStore()
        const projectName = ref("")
        const {notify} = useNotify()

        if (props.id) {
            const project = store.state.project.projects.find(p => p.id == props.id)
            projectName.value = project?.name || ''
        }
        
        const dispatchSuccess = () => {
            notify(TypeNotification.SUCCESS, 'Novo projeto salvo!', 'O projeto ' + projectName.value + ' esta disponivel')
            projectName.value = "";
            router.push('/projetos')
        }

        const saveProject = () => {
            if (props.id) {
                store.dispatch(ALTER_PROJECTS, {
                    id: props.id,
                    name: projectName
                })
                    .then(() => dispatchSuccess())
                    .catch((response) => {
                        notify(TypeNotification.DANGER, 'Erro ao alterar Projeto!', response.message)
                    })
            } else {
                store.dispatch(REGISTER_PROJECTS, projectName)
                    .then(() => dispatchSuccess())
                    .catch((response) => {
                        notify(TypeNotification.DANGER, 'Erro ao salvar Projeto!', response.message)
                    })
            }

        }

        return {
            projectName,
            saveProject
        }
    }
})
</script>