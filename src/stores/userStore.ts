
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
    set_city?(city: string): void,
    set_first_name?(value: string): void,
    set_last_name?(value: string): void,
    set_username?(value: string): void,
    set_phone?(value: string): void,
    set_avatar?(value: string): void,
    set_status?(value: -1 | 0 | 1): void,
    set_is_logged_in?(value: boolean): void,
    set_role?(value: 1 | 2 | 3): void,
    set_token?(value: string): void
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
        ),
        set_avatar: (value) => set(
            produce((state: useUserStoreOutput) => {
                state.user.avatar = value
            })
        ),
        set_first_name: (value) => set(
            produce((state: useUserStoreOutput) => {
                state.user.firstname = value
            })
        ),
        set_last_name: (value) => set(
            produce((state: useUserStoreOutput) => {
                state.user.lastname = value
            })
        ),
        set_phone: (value) => set(
            produce((state: useUserStoreOutput) => {
                state.user.phone = value
            })
        ),
        set_username: (value) => set(
            produce((state: useUserStoreOutput) => {
                state.user.username = value
            })
        ),

        set_is_logged_in: (value) => set(
            produce((state: useUserStoreOutput) => {
                state.user.isLoggedIn = value
            })
        ),
        set_role: (value) => set(
            produce((state: useUserStoreOutput) => {
                state.user.role = value
            })
        ),
        set_status: (value) => set(
            produce((state: useUserStoreOutput) => {
                state.user.status = value
            })
        ),
        set_token: (value) => set(
            produce((state: useUserStoreOutput) => {
                state.user.token = value
            })
        )
    }

}))


export type {
    userOptions
}

export default useUserStore