<template>
    <div class="text-xs-center">
        <v-card class="mb-3">
            <v-list-tile avatar class="py-4">
                <v-list-tile-avatar color="indigo">
                    <span class="white--text headline">{{ user.name[0] }}</span>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title class="textbox" @click.stop="triggerPostDialog(true)">Write your thoughts...
                    </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn icon ripple>
                        <v-icon color="grey lighten-1">camera_alt</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-card>


        <v-dialog
                :fullscreen="$vuetify.breakpoint.mdAndDown"
                v-model="postDialog"
                width="600"
        >
            <v-card>
                <v-list-tile avatar class="pt-1">
                    <v-list-tile-avatar color="indigo">
                        <span class="white--text headline">{{ user.name[0] }}</span>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ user.name }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">more_vert</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>

                <v-card-text>
                    <v-textarea solo flat auto-grow v-if="postDialog" autofocus
                                placeholder="Write your thoughts..." v-model="newPost"></v-textarea>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions class="pa-4">
                    <v-btn icon flat color="grey">
                        <v-icon>camera_alt</v-icon>
                    </v-btn>

                    <v-btn icon flat color="grey">
                        <v-icon>link</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="grey"
                            flat
                            @click="triggerPostDialog(false)"
                    >
                        CANCEL
                    </v-btn>
                    <v-btn
                            :loading="isLoading"
                            :disabled="isLoading"
                            color="primary"
                            @click="createNewPost()"
                    >
                        POST
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    const store = this.$store;
    export default {
        name: "PostDialog",
        computed: {
            ...mapGetters('general', [
                'postDialog', 'isLoading'
            ]),
            ...mapGetters('posts', [
                'newPost', 'isLoading'
            ]),
            ...mapGetters('user', [
                'user'
            ]),

            postDialog: {
                get() {
                    return this.$store.getters['general/postDialog'];
                },
                set(value) {
                    this.$store.dispatch('general/triggerPostDialog', value)
                }
            },

            newPost: {
                get() {
                    return this.$store.getters['posts/newPost'];
                },
                set(value) {
                    this.$store.dispatch('posts/updateNewPost', value)
                }
            }
        },
        methods: {
            ...mapActions('general', [
                'openPostDialog', 'closePostDialog', 'triggerPostDialog'
            ]),
            ...mapActions('posts', [
                    'createNewPost'
            ]),

        }
    }
</script>

<style scoped>
    .textbox {
        color: #999;
        cursor: text
    }

    .no-border {
        border: 0;
    }
</style>