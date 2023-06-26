
import { create } from "zustand"
import { produce } from "immer"

interface userOptions {
    userid?: number,
    username?: string,
    firstname?: string,
    lastname?: string,
    phone?: string,
    status?: -1 | 0 | 1,
    role?: 1 | 2 | 3,
    token?: string,
    city?: string,
    city_id?: number,
    avatar?: string,
    isLoggedIn?: boolean
}

interface userApis {
    setUser({ userid, username, firstname, lastname }: userOptions): void,
    set_city_id?(city_id: number): void,
    set_city?(city: string): void
}

interface useUserStoreOutput {
    user: userOptions,
    api: userApis
}

const useUserStore = create<useUserStoreOutput>(set => ({
    user: {
        userid: -1,
        username: "",
        firstname: "",
        lastname: "",
        phone: "",
        role: 1,
        status: 0,
        token: "",
        avatar: "",
        city: "",
        city_id: -1,
        isLoggedIn: false
    },
    api: {
        setUser: (props) => set({user: {
            firstname: props.firstname,
            lastname: props.lastname,
            userid: props.userid,
            username: props.username,
            phone: props.phone,
            role: props.role,
            status: props.status,
            token: props.token,
            avatar: props.avatar,
            city: props.city,
            city_id: props.city_id,
            isLoggedIn: props.isLoggedIn
        }}),
        set_city_id: (city_id) => set(
            produce((state:useUserStoreOutput) => {
                state.user.city_id = city_id
            })
        ),
        set_city: (city) => set(
            produce((state: useUserStoreOutput) => {
                state.user.city = city
            })
        )
    }

}))


export type {
    userOptions
}

export default useUserStore