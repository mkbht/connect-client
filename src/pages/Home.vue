<template>
        <v-app>
            <navigation-drawer></navigation-drawer>
            <navigation></navigation>
            <v-content>
                <v-container fluid grid-list-lg>
                    <v-layout fluid row v-bind="binding">
                        <v-flex md5>
                            <feeds></feeds>
                        </v-flex>
                        <v-flex md4>
                            <mid-bar></mid-bar>
                        </v-flex>
                        <v-flex md3>
                            <right-bar></right-bar>
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
    import RightBar from "../components/RightBar";
    import MidBar from "../components/MidBar";


    document.title = "Connect";
    export default {
        components: {MidBar, RightBar, PostDialog, Feeds, NavigationDrawer, Navigation},
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
