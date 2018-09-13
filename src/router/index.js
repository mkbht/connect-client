import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/pages/LandingPage';
import Home from '@/pages/Home';
import Post from '@/pages/Post';
import Profile from '@/pages/Profile';
import LoginPage from '@/pages/auth/LoginPage';
import Logout from '@/pages/auth/Logout';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'LandingPage',
            component: LandingPage,
            meta: {
                guest: true
            }
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage,
            meta: {
                guest: true
            }
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },

        {
            path: '/post/:id',
            name: 'Post',
            component: Post
        },

        {
            path: '/profile/:id?',
            name: 'Profile',
            component: Profile
        }
    ],
});
