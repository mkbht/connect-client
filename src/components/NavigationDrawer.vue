<template>
    <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            :value="drawer"
            fixed
            app
    >
        <v-subheader
                v-if="user"
        >
            {{ user.name }}
        </v-subheader>
        <v-divider></v-divider>
        <v-list dense>
            <template v-for="item in items">
                <v-layout
                        v-if="item.heading"
                        :key="item.heading"
                        row
                        align-center
                >
                    <v-flex xs6>
                        <v-subheader v-if="item.heading">
                            {{ item.heading }}
                        </v-subheader>
                    </v-flex>
                    <v-flex xs6 class="text-xs-center">
                        <a href="#!" class="body-2 black--text">EDIT</a>
                    </v-flex>
                </v-layout>
                <v-list-tile :key="item.text" @click="$router.push(item.link)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "NavigationDrawer",
        computed: {
            ...mapGetters('general', [
                'items'
            ]),
            ...mapGetters('user', [
                'user'
            ]),
            drawer: {
                get() {
                    return this.$store.state.drawer;
                },
                set() {
                    this.$store.commit('triggerDrawer');
                }
            }
        },

        methods: {
            ...mapActions('general', [
                'triggerDrawer'
            ])
        }
    }
</script>

<style scoped>

</style>