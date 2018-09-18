// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'typeface-roboto/index.css'
import 'vuetify/dist/vuetify.min.css'
import store from "../store";
import VueAffix from 'vue-affix';
import axios from 'axios';
import VueTimeago from 'vue-timeago';
import infiniteScroll from 'vue-infinite-scroll';
import './assets/css/style.css';


Vue.use(infiniteScroll);

Vue.use(VueTimeago, {
    name: 'Timeago', // Component name, `Timeago` by default
    locale: 'en', // Default locale
});

Vue.use(Vuetify);
Vue.use(VueAffix);

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost/connect/public/api';

router.beforeEach((to, from, next) => {

    document.title = to.meta.title;
    if (to.meta.guest === true) {
        if(localStorage.getItem('token')) {
            next('/home');
        }
    } else {
        let token = localStorage.getItem('token');
        let user = store.getters['user/user'];
        if (!token) {
            next('/login');
        } else if (user === null) {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };
            axios.get('/user', config).then((response) => {
                store.dispatch('user/setUser', response.data);
                console.log('Dispatched:');
                console.log(store.getters['user/user']);
                next();
            });
        } else {
            console.log(store.getters['user/user']);
            next();
        }

    }
    next();
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store: store,
    router,
    components: {App},
    template: '<App/>'
})
