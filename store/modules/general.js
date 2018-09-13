const state = {
    drawer: null,
    postDialog: false,
    items: [
        {icon: 'account_circle', text: 'My Profile', link: '/profile'},
        {icon: 'notifications', text: 'Notifications', link: '/notifications'},
        {icon: 'content_copy', text: 'Duplicates', link: '/profile'},
        {icon: 'exit_to_app', text: 'Logout', link: '/logout'},

    ]
};

const getters = {
    items: (state) => {
        return state.items;
    },

    drawer: (state) => {
        return state.drawer;
    },

    postDialog: (state) => {
        return state.postDialog;
    },

};

const mutations = {
    triggerDrawer: (state) => {
        return state.drawer = !state.drawer;
    },

    openPostDialog: (state) => {
        return state.postDialog = true;
    },

    triggerPostDialog: (state, payload) => {
        return state.postDialog = payload;
    },

    closePostDialog: (state) => {
        return state.postDialog = false;
    }
};

const actions = {
    triggerDrawer: ({commit}) => {
        return commit('triggerDrawer');
    },

    triggerPostDialog: (context, payload) => {
        return context.commit('triggerPostDialog', payload);
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};