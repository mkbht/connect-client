<template>
    <v-app id="login" class="login">
        <v-content class="">
            <v-container fluid fill-height>
                <v-layout justify-center>
                    <v-flex xs12 sm8 md4 text-xs-center>
                        <router-link to="/">
                            <img src="../../assets/logo.png" alt="logo" height="200" class="text-xs-center">
                        </router-link>
                        <v-card class="elevation-6 pa-4">
                            <v-card-text>
                                <div class="display-1 font-weight-thin text-xs-center">Create new account</div>
                                <v-alert
                                        :value="errors !== null"
                                        color="error"
                                        icon="warning"
                                        outline
                                >
                                    <div v-if="errors">
                                        <p v-if="errors['name'] !== undefined">{{ errors.name }}</p>
                                        <p v-if="errors.email !== undefined">{{ errors.email }}</p>
                                        <p v-if="errors.username !== undefined">{{ errors.username }}</p>
                                        <p v-if="errors.password !== undefined">{{ errors.password }}</p>
                                    </div>
                                </v-alert>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="name" label="Name"
                                                  type="text" v-model="name"></v-text-field>
                                    <v-text-field prepend-icon="mail" name="email" label="Email"
                                                  type="email" v-model="email"></v-text-field>
                                    <v-text-field prepend-icon="person" name="username" label="Username"
                                                  type="text" v-model="username"></v-text-field>
                                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password"
                                                  type="password" v-model="password"></v-text-field>
                                    <v-text-field id="cpassword" prepend-icon="lock" name="password_confirmation"
                                                  label="Confirm Password"
                                                  type="password" v-model="password_confirmation"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                Already a member?
                                <router-link to="/login" class="ml-2">Login</router-link>
                                <v-spacer></v-spacer>
                                <v-btn :loading="isLoading"
                                       :disabled="isLoading"
                                       @click="logIn"
                                       color="primary">
                                    Signup
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import axios from 'axios';
    import {login} from '@/api/auth';

    export default {
        name: "LoginPage",
        data: () => {
            return ({
                username: '',
                password: '',
                email: '',
                password_confirmation: '',
                isLoading: false,
                hasError: false,
                errors: null
            });
        },
        methods: {
            logIn: function () {
                var self = this;
                this.isLoading = true;
                axios.post('/register', {
                    name: self.name,
                    email: self.email,
                    username: self.username,
                    password: self.password,
                    password_confirmation: self.password_confirmation
                }).then(function (response) {
                    localStorage.setItem('token', response.data.token);
                    self.isLoading = false;
                    self.$router.push('home');
                }).catch(function (error) {
                    self.hasError = true;
                    self.errors = error.response.data.errors;
                    self.isLoading = false;
                })
            }
        }
    }
</script>

<style scoped>
    .login {
        background: url('/static/img/header-bg.jpg');
    }
</style>