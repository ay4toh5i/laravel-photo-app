import window from '../window'
import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

interface User {
    name: string
}

interface State {
    user?: User
    apiStatus?: boolean
    loginErrorMessages?: any
    registerErrorMessages?: any
}

const state: State = {
    user: undefined,
    apiStatus: undefined,
    loginErrorMessages: undefined,
    registerErrorMessages: undefined
}

const getters = {
    check: (state: State) => { return !! state.user },
    username: (state: State) => { return state.user ? state.user.name : '' }
}

const mutations = {
    setUser (state: State, user?: User) {
        state.user = user
    },
    setApiStatus (state: State, status: boolean) {
        state.apiStatus = status
    },
    setLoginErrorMessages (state: State, messages: any) {
        state.loginErrorMessages = messages
    },
    setRegisterErrorMessages (state: State, messages: any) {
        state.registerErrorMessages = messages
    }
}

const actions = {
    async register (context: any, data: any) {
        context.commit('setApiStatus', undefined)
        const response = await window.axios.post('/api/register', data)

        if (response.status === CREATED) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
        } else if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setApiStatus', false)
            context.commit('setRegisterErrorMessages', response.data.errors)
        } else {
            context.commit('setApiStatus', false)
            context.commit('errors/setCode', response.status, { root: true })
        }
    },

    async login (context: any, data: any) {
        context.commit('setApiStatus', null)
        const response = await window.axios.post('/api/login', data).catch(err => err.response || err)

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
        } else if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setApiStatus', false)
            context.commit('setLoginErrorMessages', response.data.errors)
        } else {
            context.commit('setApiStatus', false)
            context.commit('error/setCode', response.status, { root: true })
        }
    },

    async logout (context: any) {
        context.commit('setApiStatus', undefined)
        const response = await window.axios.post('/api/logout')

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', undefined)
        } else {
            context.commit('setApiStatus', false)
            context.commit('error/setCode', response.status, { root: true })
        }
    },

    async currentUser (context: any) {
        context.commit('setApiStatus', undefined)
        const response = await window.axios.get('/api/user')
        const user = response.data || null

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', user)
        } else {
            context.commit('setApiStatus', false)
            context.commit('error/setCode', response.status, { root: true })
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
