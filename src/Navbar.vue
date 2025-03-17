<script>
import imgHero from '/assets/Vokalschlag-2.jpg';

export default {
   data: function() {
       return {
           isOpen: false,
           imgHero
       }
   }
}
</script>

<template>
    <section class="hero is-success is-fullheight header-image" :style="{ backgroundImage: `url(${imgHero})` }">
        <!-- Hero header: will stick at the top -->
        <div class="hero-head">
            <nav class="navbar is-fixed-top semi-transparent">
                <div class="navbar-brand semi-transparent">
                    <a href="#top"><h1 class="navbar-item is-size-2 pl-5">Vokalschlag</h1></a>
                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="isOpen = !isOpen" v-bind:class="{'is-active': isOpen}">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div class="navbar-menu semi-transparent pr-5" v-bind:class="{'is-active': isOpen}">
                    <!-- navbar start, navbar end -->
                    <div class="navbar-end">
                        <a class="navbar-item" href="#ensemble">Ensemble</a>
                        <a class="navbar-item" href="#besetzung">Besetzung</a>
                        <a class="navbar-item" href="#konzerte">Konzerte</a>
                        <a class="navbar-item" href="#hoerproben">Hörproben</a>
                        <a class="navbar-item" href="#konzertarchiv">Konzertarchiv</a>
                        <a class="navbar-item" href="#kontakt">Kontakt</a>
                        <a class="navbar-item" href="https://www.facebook.com/Vokalschlag/">Facebook</a>
                    </div>
                </div>
            </nav>
        </div>
    </section>
</template>

<style>
.header-image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #999;
}
</style>