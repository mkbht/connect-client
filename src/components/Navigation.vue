<template>
    <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="blue darken-3"
            dark
            app
            fixed
    >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon
                    class="hidden-lg-and-up" @click.stop="triggerDrawer"></v-toolbar-side-icon>
            <router-link to="/home"><img src="../assets/logo.png" height="100" /></router-link>
        </v-toolbar-title>
        <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="search"
                label="Search"
                class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn icon large>
            <v-avatar size="32px" tile>
                <img
                        src="./../assets/logo.png"
                        alt="Vuetify"
                >
            </v-avatar>
        </v-btn>
    </v-toolbar>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "Navigation",
        computed: {
            ...mapGetters('general', [
                'drawer'
            ])
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