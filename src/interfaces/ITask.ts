import IProject from "./IProject";

export default interface ITask {
    id: number,
    seconds: number,
    description: string,
    project: IProject
}