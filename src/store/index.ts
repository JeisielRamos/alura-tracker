import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, ADD_TASKS, DELETE_TASKS, NOTIFY, DEFINE_PROJECT } from "./typesMutations";
import ITask from "@/interfaces/ITask";
import { INotifications } from "@/interfaces/INotifications";
import clientHTTP from "@/http";
import { ALTER_PROJECTS, GET_PROJECTS, REGISTER_PROJECTS, REMOVE_PROJECTS } from "./typeActions";
import { HttpStatusCode } from "axios";

interface State {
    projects: IProject[]
    tasks: ITask[]
    notifications: INotifications[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        projects: [],
        tasks: [],
        notifications: []
    },
    mutations: {
        [ADD_PROJECT](state,projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject

            state.projects.push(project)
        },
        [UPDATE_PROJECT](state, project: IProject) {
            const idx = state.projects.findIndex(p => p.id == project.id)
            state.projects[idx] = project
        },
        [DELETE_PROJECT](state, projectID: string){
            state.projects = state.projects.filter(p => p.id != projectID)
        },
        [DEFINE_PROJECT](state, projects: IProject[]){
            state.projects = projects
        },
        [ADD_TASKS](state,task: ITask) {
            state.tasks.push(task)
        },
        [DELETE_TASKS](state, taskDescription: string){            
            state.tasks = state.tasks.filter(t => t.description != taskDescription)
        },
        [NOTIFY](state, notification: INotifications) {
            notification.id = new Date().getTime()
            state.notifications.push(notification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id != notification.id)
            }, 3000);
        }
    },
    actions: {
        [GET_PROJECTS] ({ commit }) {
            clientHTTP.get('projetos')
                .then(response => commit(DEFINE_PROJECT, response.data))
        },
        [REGISTER_PROJECTS](context, projectName: string) {
            return clientHTTP.post('/projetos', {
                name: projectName
            })
        },
        [ALTER_PROJECTS](context, project: IProject) {
            return clientHTTP.put(`/projetos/${project.id}`, project)
        },
        [REMOVE_PROJECTS]({ commit }, projectID: string){
            return clientHTTP.delete(`/projetos/${projectID}`)
                .then(() => commit(DELETE_PROJECT, projectID))
        }
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}