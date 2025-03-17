<script>

import imgAnne    from "/assets/Anne.png";
import imgLaura   from "/assets/Laura.png";
import imgDenise  from "/assets/Denise.png";
import imgPuki    from "/assets/Puki.png";
import imgStephan from "/assets/Stephan.png";
import imgJonas   from "/assets/Jonas.png";

export default {
    data() {
        return {
            singers: [
                ["Anne Günster, Sopran",        imgAnne],
                ["Laura Zucchini, Mezzosopran", imgLaura],
                ["Denise Weltken, Alt",         imgDenise],
                ["Christian Pukelsheim, Tenor", imgPuki],
                ["Stephan Schiffels, Bariton",  imgStephan],
                ["Jonas Zucchini, Bass",        imgJonas]]
        };
    }
}
</script>

<template>
    <section class="container has-background-grey-lighter has-text-weight-light">
        <h2 class="is-size-3 m-5 p-5 has-text-weight-light" id="besetzung">Ensemblemitglieder</h2>
        <div class="fixed-grid has-3-cols p-5 has-text-centered">
            <div class="grid">
                <div class='cell m-5' v-for="singer in singers">
                    <figure class="image">
                        <img v-bind:src="singer[1]" />
                    </figure>
                    {{singer[0]}}
                </div>
            </div>
        </div>
    </section>
</template>