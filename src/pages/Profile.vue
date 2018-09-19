<template>
    <v-app>
        <navigation-drawer></navigation-drawer>
        <navigation></navigation>
        <v-content>
            <v-container fluid grid-list-lg v-if="profile">
                <div v-if="profile === 404">
                    <h1>Page Not Found</h1>
                </div>
                <div v-else>
                    <v-breadcrumbs>
                        <v-icon slot="divider">chevron_right</v-icon>

                        <v-breadcrumbs-item to="/home">Home</v-breadcrumbs-item>
                        <v-breadcrumbs-item>{{ profile.name }}
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                    <v-layout justify-space-around row v-bind="binding">
                        <v-flex md8>
                            <v-layout row>
                                <v-flex md4>
                                    <v-avatar
                                            size="150px"
                                            color="grey lighten-4"
                                            class="elevation-1">

                                    </v-avatar>
                                </v-flex>
                                <v-flex md8 fluid>
                                    <h1 class="my-2 display-2 font-weight-bold">{{ profile.name }}</h1>
                                    <h6 class="title grey--text">@{{ profile.username }}</h6>
                                    <div class="my-3">
                                        <span class="mr-4 font-weight-bold">{{ profile.total_posts }} posts</span>
                                        <span class="mr-4 font-weight-bold">{{ profile.total_followers }} followers</span>
                                        <span class="mr-4 font-weight-bold">{{ profile.total_followings }} following</span>
                                    </div>

                                    <v-btn v-if="profile.is_following" outline color="primary" small @click="unfollow(profile.id)">Unfollow</v-btn>
                                    <v-btn v-else color="primary" small @click="follow(profile.id)">Follow</v-btn>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                </div>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Navigation from "../components/Navigation";
    import NavigationDrawer from "../components/NavigationDrawer";
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "Profile",
        components: {
            NavigationDrawer, Navigation
        },
        computed: {
            ...mapGetters('user', [
                'profile'
            ]),
            binding() {
                const binding = {};
                if (this.$vuetify.breakpoint.smAndDown) binding.column = true;
                return binding;
            }
        },

        methods: {
            ...mapActions('user', [
                'follow', 'unfollow'
            ])
        },

        created() {
            console.log(this.$route.params.id);
            this.$store.dispatch('user/setProfile', this.$route.params.id);
        }
    }
</script>

<style scoped>

</style>