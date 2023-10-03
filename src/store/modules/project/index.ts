import clientHTTP from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { GET_PROJECTS, REGISTER_PROJECTS, ALTER_PROJECTS, REMOVE_PROJECTS } from "@/store/typeActions";
import { ADD_PROJECT, DEFINE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from "@/store/typesMutations";
import { Module } from "vuex";

export interface StateProject {
    projects: IProject[]
}

export const project: Module<StateProject, State> = {
    mutations: {
        [ADD_PROJECT](state, projectName: string) {
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
        [DELETE_PROJECT](state, projectID: string) {
            state.projects = state.projects.filter(p => p.id != projectID)
        },
        [DEFINE_PROJECT](state, projects: IProject[]) {
            state.projects = projects
        },
    },
    actions: {
        [GET_PROJECTS]({ commit }) {
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
        [REMOVE_PROJECTS]({ commit }, projectID: string) {
            return clientHTTP.delete(`/projetos/${projectID}`)
                .then(() => commit(DELETE_PROJECT, projectID))
        },
    }
}


