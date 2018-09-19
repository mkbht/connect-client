import axios from 'axios';

const state = {
    user: null,
    profile: null,
    posts: null,
    notifications: null,
};

const getters = {
    user: (state) => {
        return state.user;
    },

    profile: (state) => {
        return state.profile;
    },

    notifications: (state) => {
        return state.notifications;
    },
};

const mutations = {
    SET_USER: (state, payload) => {
        state.user = payload;
    },

    SET_PROFILE: (state, payload) => {
        state.profile = payload;
    },

    SET_NOTIFICATIONS: (state, payload) => {
        state.notifications = payload;
    },

    SET_PROFILE_FOLLOWED: (state, payload) => {
        state.profile.is_following = payload;
    }
};

const actions = {
    setUser: ({commit}, payload) => {
        commit('SET_USER', payload);
    },

    setProfile({commit}, user) {
        commit('SET_PROFILE', null);
        if (user === undefined) {
            user = '';
        } else {
            user = '/' + user;
        }
        axios.get("/profile" + user, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.data) {
                commit('SET_PROFILE', response.data);
            } else {
                commit('SET_PROFILE', 404);
            }
        });
    },

    setNotifications({commit}) {
        commit('SET_NOTIFICATIONS', null);

        axios.get("/notifications", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.data) {
                commit('SET_NOTIFICATIONS', response.data.data);
            }
        });
    },

    follow({commit}, id) {
        axios.post("/follow", {
            id: id
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            commit('SET_PROFILE_FOLLOWED', true);
        });
    },
    unfollow({commit}, id) {
        axios.post("/unfollow", {
            id: id
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            commit('SET_PROFILE_FOLLOWED', false);
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};