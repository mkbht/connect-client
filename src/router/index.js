import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/pages/LandingPage';
import Home from '@/pages/Home';
import Post from '@/pages/Post';
import Profile from '@/pages/Profile';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
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
                guest: true,
                title: 'Welcome to Connect'
            }
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage,
            meta: {
                guest: true,
                title: 'Login - Connect'
            }
        },
        {
            path: '/signup',
            name: 'SignupPage',
            component: SignupPage,
            meta: {
                guest: true,
                title: 'Signup - Connect'
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
            component: Home,
            meta: {
                title: 'Home - Connect'
            }
        },

        {
            path: '/post/:id',
            name: 'Post',
            component: Post,
            meta: {
                title: 'Post - Connect'
            }
        },

        {
            path: '/profile/:id?',
            name: 'Profile',
            component: Profile,
            meta: {
                title: 'Profile - Connect'
            }
        }
    ],
});
