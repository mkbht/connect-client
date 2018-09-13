import axios from 'axios';

const state = {
    posts: null,
    newPost: '',
    isLoading: false,
    currentPost: null,
    currentPostSentiment: null,
    busyPostsLoader: false,
    chartColor: 'blue lighten-2',

};

const getters = {
    posts: (state) => {
        return state.posts;
    },

    newPost: (state) => {
        return state.newPost;
    },

    isLoading: (state) => {
        return state.isLoading;
    },

    currentPost: (state) => {
        return state.currentPost;
    },

    currentPostSentiment: (state) => {
        return state.currentPostSentiment;
    },

    busyPostsLoader: (state) => {
        return state.busyPostsLoader;
    },

    chartColor: (state) => {
        if(state.currentPostSentiment) {
            if (state.currentPostSentiment.category === 'pos')
                return 'teal';
            else if(state.currentPostSentiment.category === 'neg')
                return 'red lighten-1';
            return state.chartColor;
        }
    },

    sentimentType: (state) => {
        if(state.currentPostSentiment) {
            if(state.currentPostSentiment.category === 'pos')
                return 'Positive';
            else if(state.currentPostSentiment.category === 'neg')
                return 'Negative';
            return 'Neutral';
        }
    },

    sentimentIcon: (state) => {
        if(state.currentPostSentiment) {
            if(state.currentPostSentiment.category === 'pos')
                return 'mood';
            else if(state.currentPostSentiment.category === 'neg')
                return 'mood_bad';
            return 'face';
        }
    }

};

const mutations = {
    ADD_POST: (state, newPost) => {
        console.log(newPost);
        state.posts.data.unshift(newPost);
    },

    LOAD_POSTS: (state, posts) => {
        state.posts = posts;
    },

    LOAD_CURRENT_POST: (state, post) => {
        state.currentPost = post;
    },

    LOAD_CURRENT_POST_SENTIMENT: (state, sentiment) => {
        state.currentPostSentiment = sentiment;
    },

    LOAD_MORE_POSTS: (state, posts) => {
        state.posts.data = state.posts.data.concat(posts.data);
        state.posts.current_page = posts.current_page;
        state.posts.from = posts.from;
        state.posts.next_page_url = posts.next_page_url;
        state.posts.prev_page_url = posts.prev_page_url;
        state.posts.to = posts.to;
    },

    BUSY_POSTS_LOADER: (state, payload) => {
        state.busyPostsLoader = payload;
    },

    UPDATE_NEW_POST: (state, payload) => {
        state.newPost = payload;
    },

    LIKE: (state, info) => {
        console.log(info);
        if (info.single) {
            const currentPost = state.currentPost;
            currentPost.liked = !currentPost.liked;
            if (info.payload === 0) {
                currentPost.like_count--;
            } else {
                currentPost.like_count++;

            }
        }
        else {
            const post = state.posts.data.find(post => post.id === info.id);
            post.liked = !post.liked;
            if (info.payload === 0) {
                post.like_count--;
            } else {
                post.like_count++;

            }
        }
    }
};

const actions = {

    loadPosts: ({commit}) => {
        axios.get("http://localhost/connect/public/api/post", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.data) {
                commit('LOAD_POSTS', response.data);
            }
        });
    },

    loadMorePosts: ({commit, state}) => {
        commit('BUSY_POSTS_LOADER', true);
        console.log(state.posts);
        axios.get(state.posts.next_page_url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.data) {
                commit('LOAD_MORE_POSTS', response.data);
                if (response.data.next_page_url !== null) {
                    commit('BUSY_POSTS_LOADER', false);
                }
            }
        });
    },

    loadCurrentPost: ({commit}, id) => {
        commit('LOAD_CURRENT_POST', null);
        axios.get("/post/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.data) {
                commit('LOAD_CURRENT_POST', response.data);
            }
        });
        commit('LOAD_CURRENT_POST_SENTIMENT', null);
        axios.get("/post/sentiment/" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.data) {
                commit('LOAD_CURRENT_POST_SENTIMENT', response.data);
            }
        })
    },

    updateNewPost: ({commit}, payload) => {
        commit('UPDATE_NEW_POST', payload);
    },

    createNewPost: ({commit, state}) => {
        if (state.newPost !== '') {
            state.isLoading = true;
            axios.post("/post", {
                content: state.newPost
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then((response) => {
                commit('general/triggerPostDialog', false, {root: true});
                commit('ADD_POST', response.data);
                commit('UPDATE_NEW_POST', '');
                state.isLoading = false;
            });
        }
    },

    like: ({commit}, payload) => {

        axios.get('like/' + payload.id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            commit('LIKE', {id: payload.id, payload: response.data, single: !!payload.single});
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