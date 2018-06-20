import shop from '../../api/hw'

const state = {
    words: []
}

const getters = {}

const actions = {
    getAllWords({ commit }, name) {
        shop.getWord(words => {
            commit('setWords', words)
        }, name)
    }
}

const mutations = {
    setWords(state, words) {
        state.words = words
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
