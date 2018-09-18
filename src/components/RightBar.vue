<template>
    <v-card class="transparent elevation-0">
        <v-subheader>Followings</v-subheader>
        <v-list class="transparent">
            <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    avatar
                    @click=""
            >
                <v-list-tile-avatar>
                    <img :src="item.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
    export default {
        name: "RightBar",
        data () {
            return {
                items: [
                    { title: 'Jason Oner', avatar: 'https://randomuser.me/api/portraits/men//1.jpg' },
                    { title: 'Travis Howard', avatar: 'https://randomuser.me/api/portraits/men//2.jpg' },
                    { title: 'Ali Connors', avatar: 'https://randomuser.me/api/portraits/men//3.jpg' },
                    { title: 'Cindy Baker', avatar: 'https://randomuser.me/api/portraits/men//4.jpg' },
                    { title: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men//5.jpg' },
                    { title: 'Darth Vader', avatar: 'https://randomuser.me/api/portraits/men//6.jpg' },
                    { title: 'Sarah Conner', avatar: 'https://randomuser.me/api/portraits/men//7.jpg' },
                    { title: 'Peter Parker', avatar: 'https://randomuser.me/api/portraits/men//8.jpg' }
                ]
            }
        }
    }
</script>

<style scoped>

</style>