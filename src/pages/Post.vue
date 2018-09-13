<template>
    <v-app>
        <navigation-drawer></navigation-drawer>
        <navigation></navigation>
        <v-content>
            <v-container fluid grid-list-lg>
                <v-layout fluid row v-bind="binding">
                    <v-flex md6>
                        <!-- <v-breadcrumbs>
                            <v-icon slot="divider">chevron_right</v-icon>

                            <v-breadcrumbs-item to="/home">Home</v-breadcrumbs-item>
                            <v-breadcrumbs-item v-if="currentPost">{{ currentPost.user.name }}'s Post
                            </v-breadcrumbs-item>
                        </v-breadcrumbs> -->
                        <v-card v-if="currentPost" class="mb-3">
                            <v-list-tile avatar class="pt-3">
                                <v-list-tile-avatar color="teal">
                                    <span class="white--text headline">{{ currentPost.user.name[0] }}</span>
                                </v-list-tile-avatar>

                                <v-list-tile-content>

                                    <v-list-tile-title>
                                        <router-link to="/home"><span>{{ currentPost.user.name }}</span>
                                        </router-link>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        <timeago :datetime="currentPost.created_at" :auto-update="60"></timeago>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-btn icon ripple>
                                        <v-icon color="grey lighten-1">more_vert</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>

                            <v-card-title>
                                <div>
                                    <div>
                                        {{ currentPost.content }}
                                    </div>
                                </div>
                            </v-card-title>

                            <v-card-actions class="pb-3">
                                <v-btn icon flat :color="(currentPost.liked) ? 'red' : 'grey'"
                                       @click="like({id: currentPost.id, single: true})">
                                    <v-icon>favorite</v-icon>
                                </v-btn>
                                {{ currentPost.like_count }}

                                <v-btn icon flat color="grey">
                                    <v-icon>mode_comment</v-icon>
                                </v-btn>
                                {{ currentPost.comment_count }}
                            </v-card-actions>
                            <v-divider></v-divider>
                            <v-text-field solo flat
                                          placeholder="Write a comment..." autofocus
                            ></v-text-field>
                        </v-card>
                        <v-subheader>Comments</v-subheader>
                        <v-divider></v-divider>
                        Hola
                    </v-flex>gi

                    <v-flex md-6>
                        <div v-if="currentPostSentiment == null">
                            <div class="wrapper">
                                <div class="blue ball"></div>
                                <div class="red ball"></div>
                                <div class="yellow ball"></div>
                                <div class="green ball"></div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="text-xs-center">
                                <h3 class="display-1 font-weight-thin">Sentiment Analysis</h3>
                                <v-divider class="my-2"></v-divider>
                                <v-progress-circular
                                        v-if="!currentPostSentiment.log"
                                        :rotate="360"
                                        :size="200"
                                        :width="30"
                                        :value="currentPostSentiment.score.positivity > currentPostSentiment.score.negativity
                                                ? currentPostSentiment.score.positivity * 100
                                                : currentPostSentiment.score.negativity * 100"
                                        :color="chartColor"
                                >
                                    <v-icon size="50" :color="chartColor">{{ sentimentIcon }}</v-icon>
                                    <br>
                                    {{ sentimentType }}
                                </v-progress-circular>
                                <div v-else>
                                    <v-icon size="50" :color="chartColor">{{ sentimentIcon }}</v-icon>
                                    <br>
                                    {{ sentimentType }}
                                </div>
                            </div>

                        </div>
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
        name: "Post",
        components: {
            NavigationDrawer, Navigation
        },
        computed: {
            ...mapGetters('posts', [
                'currentPost', 'currentPostSentiment', 'chartColor', 'sentimentIcon', 'sentimentType'
            ]),
            binding() {
                const binding = {};
                if (this.$vuetify.breakpoint.smAndDown) binding.column = true;
                return binding;
            },
        },

        methods: {
            ...mapActions('posts', [
                'like'
            ]),
        },

        created() {
            this.$store.dispatch('posts/loadCurrentPost', this.$route.params.id);
        }
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px
    }

    .ball {
        width: 22px;
        height: 22px;
        border-radius: 11px;
        margin: 0 10px;

        animation: 2s bounce ease infinite;
    }

    .blue {
        background-color: #4285F5;
    }

    .red {
        background-color: #EA4436;
        animation-delay: .25s;
    }

    .yellow {
        background-color: #FBBD06;
        animation-delay: .5s;
    }

    .green {
        background-color: #34A952;
        animation-delay: .75s;
    }

    @keyframes bounce {
        50% {
            transform: translateY(25px);
        }
    }

</style>