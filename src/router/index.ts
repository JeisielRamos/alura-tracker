import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import VTasks from '../views/VTasks.vue'
import VProjects from '../views/VProjects.vue'
import VProjectForm from '../views/Projects/VProjectForm.vue'
import VProjectList from '../views/Projects/VProjectList.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: VTasks
    },
    {
        path: '/projetos',
        component: VProjects,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: VProjectList
            },
            {
                path: 'novo',
                name: 'Novo Projeto',
                component: VProjectForm
            },
            {
                path: ':id',
                name: 'Editar Projeto',
                component: VProjectForm,
                props: true
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router