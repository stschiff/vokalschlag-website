$(document).ready(function(){
    fetchEvents();
});

async function fetchEvents() {
    try {
        const response = await fetch('events.json');
        const data = await response.json();

        const section = $("#events");
        data.forEach(item => {
            section.append('<div>');
            const titleE = section.createElement('h3');
            titleE.textContent = item.title;
            const dateE = section.
            const newElement = document.createElement('p');
            const date = new Date(item.date);
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              };
            newElement.textContent = `${date.toLocaleDateString("de-DE", options)}: ${item.title}`;
            section.appendChild(newElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

