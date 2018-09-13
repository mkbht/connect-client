const state = {
    user: null,
    profile: null,
    posts: null,
};

const getters = {
    user: (state) => {
        return state.user;
    },

    profile: (state) => {
        return state.profile;
    }
};

const mutations = {
    SET_USER: (state, payload) => {
        state.user = payload;
    }
};

const actions = {
    setUser: ({commit}, payload) => {
        commit('SET_USER', payload);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};