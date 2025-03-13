<script>

import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

function renderDescription({ content }) {
    const textNodes = [];
    const imageNodes = [];

    // Splitting text and image nodes
    content.forEach(node => {
        if (node.nodeType === 'embedded-asset-block') {
            imageNodes.push(node);
        } else {
            textNodes.push(node);
        }
    });

    // Add options for documentToHtmlString
    const options = {
        renderNode: {
            'embedded-asset-block': node => {
                const { title, file } = node.data.target.fields;
                const imageUrl = file.url;
                const imageAlt = title;
                return `
                    <img src="${imageUrl}" alt="${imageAlt}" />
                `;
            },
            // Add other node handlers if necessary
        },
    };

    // Rendering text and images to HTML
    const renderedText = documentToHtmlString({ content: textNodes, nodeType: 'document' }, options);
    const renderedImages = documentToHtmlString({ content: imageNodes, nodeType: 'document' }, options);

    // Return the wrapped HTML
    return `
        <div class="columns">
            <div class="column">
                ${renderedText}
            </div>
            <div class="column">
                ${renderedImages}
            </div>
        </div>
    `;
}

function renderDate(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    return date.toLocaleDateString("de-DE", options);
}

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
            events: []
        };
    },
    methods: {
        async getEvents() {
            const client = createClient({
                space: '76yj40147xeg',
                accessToken: 'PxDUlLWp-vM4MjXlJYXv8goBxSpp1SNNgcGaofwTWf0',
            })
            // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token
            client
                .getEntries({'include': 2})
                .then((entry) => {
                    this.events = entry.items.map(e => {
                        const date = new Date(e.fields.date);
                        const renderedDate = renderDate(date);
                        const renderedDescription = e.fields.description ? renderDescription(e.fields.description) : "";
                        return {
                            date,
                            renderedDate,
                            location: documentToHtmlString(e.fields.location),
                            title: e.fields.title,
                            renderedDescription
                        }
                    });
                })
                .catch((err) => console.log(err))
        },
    },
    computed: {
        futureEvents() {
            return this.events.filter(e => {
                return e.date >= Date.now();
            }).sort((a, b) => {
                return a.date - b.date;
            })
        },
        pastEvents() {
            return this.events.filter(e => {
                return e.date < Date.now();
            }).sort((a, b) => {
                return b.date - a.date;
            })
        }
    },
    mounted() {
        this.getEvents();
    }
}
</script>

<template>
    <section class="container has-background-light has-text-weight-light">
        <h2 class="is-size-3 m-5 p-5 has-text-weight-light">Vokalschlag</h2>
        <div class="content m-5 p-5">
            <p>Einzigartige Stimmfarben, intensiver musikalischer Ausdruck und eine große Nähe zum Konzertpublikum – das zeichnet das Ensemble Vokalschlag aus. Seit 2008 konzertiert das A-cappella-Sextett deutschlandweit und präsentiert seinem Publikum anspruchsvolle und professionell erarbeitete Werke vom 16. bis zum 21. Jahrhundert.</p>
            
            <p>Die sechs Sängerinnen und Sänger haben ihre Wurzeln in der Kölner Chorszene. Dort entwickelten sie Ihre Leidenschaft am Musizieren in kleiner Besetzung und an künstlerischer Arbeit im Team und auf Augenhöhe. Diese intensive musikalische und menschliche Arbeit hat letztlich auch die langjährige Freundschaft geprägt, die sich in vielen gestalterischen Aufmerksamkeiten im Konzerterlebnis widerspiegelt. </p>

            <p>Die musikalische Heimat des Kölner Ensembles ist insbesondere die Barock- und Renaissancemusik. Kompositionen von Schütz, Schein, Bach oder Homilius gehören für Vokalschlag ins Standardrepertoire. Das Publikum kann sich aber auch auf moderne Ausflüge in die zeitgenössische Musik oder in den A-Cappella-Pop und –Jazz (zum Teil mit eigenen Arrangements) freuen. Dabei steht für die Sängerinnen und Sänger immer der Wille zum intensiven musikalischen Ausdruck im Vordergrund: Die Ernsthaftigkeit der Interpretation, gepaart mit einer gehörigen Portion Humor und Leichtigkeit, verbindet sich so zu kontrastreichen Konzertprogrammen, in denen musikalische „Stilbrüche“ in thematisch zusammenhängenden Blöcken kombiniert werden. Vokalschlag ist „A-cappella in grün“: intensiv, frisch und vielseitig.</p>
        </div>
    </section>
    <section class="container has-background-grey-lighter has-text-weight-light">
        <h2 class="is-size-3 m-5 p-5 has-text-weight-light">Ensemblemitglieder</h2>
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
    <section class="container has-background-success">
        <h2 class="is-size-3 m-5 p-5 has-text-weight-light">Anstehende Konzerte</h2>
        <div id="events" class="content m-5 p-5" v-for="event in futureEvents">
            <h3 class="has-text-weight-light">{{ event.title }}<br />
                <small>{{ event.renderedDate }}</small>
                </h3>
                <p v-html="event.location"></p>
                <div v-html="event.renderedDescription"></div>
        </div>
        <h2 class="is-size-3 m-5 p-5 has-text-weight-light">Konzert-Archiv</h2>
        <div id="events" class="content m-5 p-5" v-for="event in pastEvents">
            <h3 class="has-text-weight-light">{{ event.title }}<br />
                <small>{{ event.renderedDate }}</small></h3>
                <p v-html="event.location"></p>
                <details>
                    <summary>Details</summary>
                    <div v-html="event.renderedDescription"></div>
                </details>
        </div>
    </section>
</template>