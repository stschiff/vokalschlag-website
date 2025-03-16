<script>
export default {
    data() {
        return {
            singers: [
                ["Anne Günster, Sopran",        "/assets/Anne.png"],
                ["Laura Zucchini, Mezzosopran", "/assets/Laura.png"],
                ["Denise Weltken, Alt",         "/assets/Denise.png"],
                ["Christian Pukelsheim, Tenor", "/assets/Puki.png"],
                ["Stephan Schiffels, Bariton",  "/assets/Stephan.png"],
                ["Jonas Zucchini, Bass",        "/assets/Jonas.png"]],
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