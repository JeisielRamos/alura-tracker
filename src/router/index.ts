import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import VTasks from '../views/VTasks.vue'
import VProjects from '../views/VProjects.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: VTasks
    },
    {
        path: '/projetos',
        name: 'Projetos',
        component: VProjects
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router