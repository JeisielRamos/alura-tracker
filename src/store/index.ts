import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { INotifications } from "@/interfaces/INotifications";
import { StateProject, project } from "./modules/project";
import { StateTask, task, } from "./modules/task";
import { NOTIFY } from "./typesMutations";

export interface State {
    project: StateProject
    task: StateTask
    notifications: INotifications[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        project: {
            projects: []
        },
        task: {
            tasks: []
        },
        notifications: []
    },
    mutations: {
        [NOTIFY](state, notification: INotifications) {
            notification.id = new Date().getTime()
            state.notifications.push(notification)

            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id != notification.id)
            }, 3000);
        }
    },
    modules: {
        project,
        task
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key)
}