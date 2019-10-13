interface State {
   code: number | null
}

const state: State = {
    code: null
}

const mutations = {
    setCode (state: State, code: number) {
        state.code = code
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
