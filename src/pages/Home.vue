<template>
        <v-app>
            <navigation-drawer></navigation-drawer>
            <navigation></navigation>
            <v-content>
                <v-container fluid grid-list-lg>
                    <v-layout fluid row v-bind="binding">
                        <v-flex md6>
                            <feeds></feeds>
                        </v-flex>
                        <v-flex md4>

                        </v-flex>
                        <v-flex md2>
                            ddda
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </v-app>
</template>

<script>
    import Navigation from "../components/Navigation";
    import NavigationDrawer from "../components/NavigationDrawer";
    import Feeds from "../components/Feeds";
    import PostDialog from "../components/PostDialog";
    import {mapGetters, mapActions} from 'vuex';


    document.title = "Connect";
    export default {
        components: {PostDialog, Feeds, NavigationDrawer, Navigation},
        computed: {
            ...mapGetters('user', [
                'user'
            ]),
            binding() {
                const binding = {};
                if (this.$vuetify.breakpoint.smAndDown) binding.column = true;
                return binding;
            }
        }
        ,

        methods: {}
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>

<style scoped>

</style>
