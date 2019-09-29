import window from'../window'

interface User {
}

interface State {
    user: User | null
}
const state: State = {
    user: null
}

const getters = {}

const mutations = {
    setUser (state: State, user: User | null) {
        state.user = user
    }
}

const actions = {
    async register (context: any, data: any) {
        const response = await window.axios.post('/api/register', data)
        context.commit('setUser', response.data)
    },

    async login (context: any, data: any) {
        const response = await window.axios.post('/api/login', data)
        context.commit('setUser', response.data)
    },

    async logout (context: any) {
        const response = await window.axios.post('/api/logout')
        context.commit('setUser', null)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
