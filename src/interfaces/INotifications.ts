export enum TypeNotification {
    SUCCESS,
    DANGER,
    WARNING
}

export interface INotifications {
    title: string
    text: string
    type: TypeNotification
    id: number
}