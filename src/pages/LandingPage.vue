<template>
    <v-app id="connect-home" class="home">
        <v-content>
            <section>
                <v-parallax src="/static/img/header-bg.jpg" height="600">
                    <v-layout
                            column
                            align-center
                            justify-center
                            class="white--text"
                    >
                        <img src="../assets/logo.png" alt="logo" height="200">
                        <h1 class="white--text mb-2 display-3 text-xs-center font-weight-thin">Welcome to <b>CONNECT</b></h1>
                        <div class="subheading mb-3 text-xs-center">A cool place to hang out</div>
                        <div class="fluid">
                            <v-btn
                                    class="pink white--text"
                                    dark
                                    large
                                    to="/login"
                            >
                                Login
                            </v-btn>
                            <v-btn
                                    color="white"
                                    large
                                    outline
                                    to="/signup"
                            >
                                Signup
                            </v-btn>
                        </div>
                    </v-layout>
                </v-parallax>
            </section>
        </v-content>
    </v-app>
</template>

<script>

</script>

<style scoped>
    .home {
        background: url('/static/img/header-bg.jpg');
    }
</style>
