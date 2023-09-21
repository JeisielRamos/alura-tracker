import { TypeNotification } from "@/interfaces/INotifications"
import { NOTIFY } from "@/store/typesMutations"
import { store } from "@/store"

export const notificationMixin = {
    methods: {

        notify(type: TypeNotification, title: string, text: string) : void {

            store.commit(NOTIFY, {
                title: title,
                text: text,
                type: type
            })
        }
    },
}