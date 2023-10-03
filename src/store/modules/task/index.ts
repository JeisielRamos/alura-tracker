import clientHTTP from "@/http"
import ITask from "@/interfaces/ITask"
import { State } from "@/store"
import { DEFINE_TASKS, GET_TASKS, REGISTER_TASKS, ALTER_TASK } from "@/store/typeActions"
import { ADD_TASKS, DELETE_TASKS, UPDATE_TASKS } from "@/store/typesMutations"
import { Module } from "vuex"

export interface StateTask {
    tasks: ITask[]
}

export const task: Module<StateTask, State> = {
    mutations:{
        [ADD_TASKS](state,task: ITask) {
            state.tasks.push(task)
        },
        [DELETE_TASKS](state, taskDescription: string){            
            state.tasks = state.tasks.filter(t => t.description != taskDescription)
        },
        [DEFINE_TASKS](state, tasks: ITask[]){
            state.tasks = tasks
        },
        [UPDATE_TASKS](state, task: ITask){
            const idx = state.tasks.findIndex(t => t.id == task.id)
            state.tasks[idx] = task
        },
    },
    actions:{
        [GET_TASKS] ({ commit }) {
            clientHTTP.get('tarefas')
                .then(response => commit(DEFINE_TASKS, response.data))
        },
        [REGISTER_TASKS]({ commit }, task: ITask) {
            return clientHTTP.post('/tarefas', task)
                .then(response => commit(ADD_TASKS, response.data))
        },
        [ALTER_TASK]({ commit }, task: ITask) {
            return clientHTTP.put(`/tarefas/${task.id}`, task)
                .then(response => commit(UPDATE_TASKS, response.data))
        },

    }
}