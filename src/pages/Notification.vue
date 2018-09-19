<template>
    <v-app>
        <navigation-drawer></navigation-drawer>
        <navigation></navigation>
        <v-content>
            <v-container fluid grid-list-lg>
                <div>
                    <v-breadcrumbs>
                        <v-icon slot="divider">chevron_right</v-icon>

                        <v-breadcrumbs-item to="/home">Home</v-breadcrumbs-item>
                        <v-breadcrumbs-item>Notifications
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                    <v-layout justify-space-around row v-bind="binding">
                        <v-flex md8>
                            <v-layout row>
                                <v-flex md12>
                                    <v-list v-for="notification in notifications" :key="notification.id">
                                        <v-list-tile-title>
                                            <v-list-tile-content>
                                                <v-list-tile-title
                                                        :class="notification.seen === 0 ? 'font-weight-bold' : ''">{{
                                                    notification.content }}
                                                    <timeago class="grey--text" :datetime="notification.created_at"
                                                             :auto-update="60"></timeago>
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile-title>
                                    </v-list>
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
        name: "PNotification",
        components: {
            NavigationDrawer, Navigation
        },
        computed: {
            ...mapGetters('user', [
                'profile', 'notifications'
            ]),
            binding() {
                const binding = {};
                if (this.$vuetify.breakpoint.smAndDown) binding.column = true;
                return binding;
            }
        },

        methods: {
            ...mapActions('user', [
                'follow', 'unfollow', 'setNotifications'
            ])
        },

        created() {
            console.log(this.$route.params.id);
            this.$store.dispatch('user/setNotifications');
        }
    }
</script>

<style scoped>

</style>