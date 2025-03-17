<script>

import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Ensemble from './Ensemble.vue';
import Navbar from './Navbar.vue';


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
            events: [],
            selectedArchiveYearIndex: 0
        };
    },
    components: {
        Navbar,
        Ensemble
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
    // },
    // computed: {
        futureEvents() {
            return this.events
                .filter(e => e.date >= Date.now())
                .sort((a, b) => a.date - b.date)
        },
        pastEvents() {
            return this.events
                .filter(e => e.date.getFullYear() == this.selectedArchiveYear())
                .sort((a, b) => b.date - a.date)
        },
        archiveYears() {
            const allYears = this.events
                .filter(e => e.date < Date.now())   
                .map(e => e.date.getFullYear())
                .sort((a, b) => b - a);
            return [...new Set(allYears)];
        },
        selectedArchiveYear() {
            return this.archiveYears()[this.selectedArchiveYearIndex];
        },
        setSelectedYearIndex(index) {
            this.selectedArchiveYearIndex = index;
        }
    },
    mounted() {
        this.getEvents();
    }
}
</script>

<template>
    <Navbar />
    <section class="container has-background-light has-text-weight-light p-6" id="ensemble">
        <h2 class="is-size-3 has-text-weight-light mb-5">Vokalschlag</h2>
        <div class="content">
            <p>Einzigartige Stimmfarben, intensiver musikalischer Ausdruck und eine große Nähe zum Konzertpublikum – das zeichnet das Ensemble Vokalschlag aus. Seit 2008 konzertiert das A-cappella-Sextett deutschlandweit und präsentiert seinem Publikum anspruchsvolle und professionell erarbeitete Werke vom 16. bis zum 21. Jahrhundert.</p>
            
            <p>Die sechs Sängerinnen und Sänger haben ihre Wurzeln in der Kölner Chorszene. Dort entwickelten sie Ihre Leidenschaft am Musizieren in kleiner Besetzung und an künstlerischer Arbeit im Team und auf Augenhöhe. Diese intensive musikalische und menschliche Arbeit hat letztlich auch die langjährige Freundschaft geprägt, die sich in vielen gestalterischen Aufmerksamkeiten im Konzerterlebnis widerspiegelt. </p>

            <p>Die musikalische Heimat des Kölner Ensembles ist insbesondere die Barock- und Renaissancemusik. Kompositionen von Schütz, Schein, Bach oder Homilius gehören für Vokalschlag ins Standardrepertoire. Das Publikum kann sich aber auch auf moderne Ausflüge in die zeitgenössische Musik oder in den A-Cappella-Pop und –Jazz (zum Teil mit eigenen Arrangements) freuen. Dabei steht für die Sängerinnen und Sänger immer der Wille zum intensiven musikalischen Ausdruck im Vordergrund: Die Ernsthaftigkeit der Interpretation, gepaart mit einer gehörigen Portion Humor und Leichtigkeit, verbindet sich so zu kontrastreichen Konzertprogrammen, in denen musikalische „Stilbrüche“ in thematisch zusammenhängenden Blöcken kombiniert werden. Vokalschlag ist „A-cappella in grün“: intensiv, frisch und vielseitig.</p>
        </div>
    </section>
    <Ensemble />
    <section class="container p-6" id="konzerte">
        <h2 class="is-size-3 has-text-weight-light mb-6">Anstehende Konzerte</h2>
        <div v-if="events.length == 0" class="content">
            <span class="loader"></span>
        </div>
        <div v-else id="events" class="content" v-for="(event, index) in futureEvents()" :key="index">
            <div class="box event">
            <h3 class="has-text-weight-light">{{ event.title }}<br />
                <small>{{ event.renderedDate }}</small>
                </h3>
                <p v-html="event.location"></p>
                <div v-html="event.renderedDescription"></div>
            </div>
        </div>
    </section>
    <section class="container p-5" id="hoerproben">
        <h2 class="is-size-3 has-text-weight-light mb-5">Hörproben</h2>
        <p>... coming soon ... </p>
    </section>
    <section class="container p-5" id="konzertarchiv">
        <h2 class="is-size-3 has-text-weight-light mb-5">Konzert-Archiv</h2>
        <div v-if="events.length == 0" class="container">
            <span class="loader"></span>
        </div>
        <div v-else class="tabs is-centered">
            <ul v-for="(year, index) in archiveYears()" :key="index">
                <li v-if="selectedArchiveYear() == year" class="is-active">
                    <a>{{  year }}</a>
                </li>
                <li v-else>
                    <a @click.prevent="setSelectedYearIndex(index)">{{  year }}</a>
                </li>
            </ul>
        </div>
        <div id="events" class="content" v-for="(event, index) in pastEvents()" :key="index">
            <div class="box event">
            <h3 class="has-text-weight-light">{{ event.title }}<br />
                <small>{{ event.renderedDate }}</small></h3>
                <p v-html="event.location"></p>
                <details>
                    <summary>Details</summary>
                    <div v-html="event.renderedDescription"></div>
                </details>
            </div>
        </div>
´    </section>
    <section class="container p-5" id="kontakt">
        <h2 class="is-size-3 has-text-weight-light mb-5">Kontakt</h2>
        <p>Kontaktieren Sie uns unter <a href="mailto:info@vokalschlag.de">info@vokalschlag.de</a></p>
    </section>
    <footer class="footer">
    <div class="content has-text-centered">
      <p>&#169; Vokalschlag (2025)</p>
    </div>
  </footer>
</template>

