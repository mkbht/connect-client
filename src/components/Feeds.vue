<template>
    <div>
        <div v-if="!posts">
            <post-placeholder></post-placeholder>
        </div>
        <div v-else-if="posts.data">
            <post-dialog></post-dialog>
            <v-card v-for="post in posts.data" :key="post.id" class="mb-3">
                <v-list-tile avatar class="pt-3">
                    <v-list-tile-avatar color="teal">
                        <span class="white--text headline">{{ post.user.name[0] }}</span>
                    </v-list-tile-avatar>

                    <v-list-tile-content>

                        <v-list-tile-title>
                            <router-link class="blue--text text--darken-2 font-weight-bold" :to="{name: 'Profile', params: {id: post.user.username}}">{{ post.user.name
                                }}
                            </router-link>
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                            <timeago class="grey--text" :datetime="post.created_at" :auto-update="60"></timeago>
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon ripple :to="{name: 'Post', params: {id: post.id}}">
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>

                <v-card-title>
                    <div>
                        <div v-html="post.content">
                        </div>
                    </div>
                </v-card-title>

                <v-card-actions class="pb-3">
                    <v-btn icon flat :color="(post.liked) ? 'red' : 'grey'" @click="like({id: post.id})">
                        <v-icon>favorite</v-icon>
                    </v-btn>
                    {{ post.like_count }}

                    <v-btn icon flat color="grey" :to="{name: 'Post', params: {id: post.id}}">
                        <v-icon>mode_comment</v-icon>
                    </v-btn>
                    {{ post.comment_count }}
                </v-card-actions>
            </v-card>
            <div class="text-xs-center">
                <v-btn @click="loadMorePosts"
                       v-if="posts.next_page_url && !busyPostsLoader" color="primary" class="text-xs-center">Load More
                    Posts
                </v-btn>
                <post-placeholder v-else-if="posts.next_page_url && busyPostsLoader"></post-placeholder>
            </div>
        </div>
        <div v-else>
            <post-dialog></post-dialog>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import PostPlaceholder from "./PostPlaceholder";
    import PostDialog from "./PostDialog";

    export default {
        name: "Feeds",
        components: {PostDialog, PostPlaceholder},
        mounted() {
            this.$store.dispatch('posts/loadPosts');
        },
        computed: {
            ...mapGetters('posts', [
                'posts', 'busyPostsLoader',
            ]),
        },
        methods: {
            ...mapActions('posts', [
                'like', 'loadMorePosts'
            ]),
        }
    }
</script>

<style scoped>

</style>