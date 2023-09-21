import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, ADD_TASKS, DELETE_TASKS, NOTIFY } from "./typesMutations";
import ITask from "@/interfaces/ITask";
import { INotifications } from "@/interfaces/INotifications";

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
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}