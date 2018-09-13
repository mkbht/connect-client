<template>
    <v-app>
        <navigation-drawer></navigation-drawer>
        <navigation></navigation>
        <v-content>
            <v-container fluid grid-list-lg>
                <v-breadcrumbs>
                    <v-icon slot="divider">chevron_right</v-icon>

                    <v-breadcrumbs-item to="/home">Home</v-breadcrumbs-item>
                    <v-breadcrumbs-item>Profile
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
                                    Picture
                                </v-avatar>
                            </v-flex>
                            <v-flex md8 fluid>
                                <h1 class="my-2 display-2 font-weight-bold">Mukunda Bhattarai</h1>
                                <h6 class="title grey--text">@zorgan</h6>
                                <div class="my-3">
                                    <span class="mr-4 font-weight-bold">5 posts</span>
                                    <span class="mr-4 font-weight-bold">51 followers</span>
                                    <span class="mr-4 font-weight-bold">5 following</span>
                                </div>

                                <v-btn outline color="primary" small>Follow</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        </v-flex>
                </v-layout>
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
            binding() {
                const binding = {};
                if (this.$vuetify.breakpoint.smAndDown) binding.column = true;
                return binding;
            }
        },

        methods: {},

        created() {

        }
    }
</script>

<style scoped>

</style>