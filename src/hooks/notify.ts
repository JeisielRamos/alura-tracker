import { TypeNotification } from "@/interfaces/INotifications"
import { store } from "@/store"
import { NOTIFY } from "@/store/typesMutations"
type Notification = {
    notify: (type: TypeNotification, title: string, text: string) => void
}

export default () : Notification => {
    const  notify = (type: TypeNotification, title: string, text: string) : void => {

        store.commit(NOTIFY, {
            title: title,
            text: text,
            type: type
        })
    }

    return  {
        notify
    }
}
