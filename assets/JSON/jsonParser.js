fetch('db/data.json')
    .then(response => response.json())
    .then(parsedData => {
        // Log the parsed JSON data to the console
        console.log(parsedData);
        generateArticles(parsedData);

        // You can also use JSON.stringify for formatted output
        console.log(JSON.stringify(parsedData, null, 2));
    })
    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
    });

function generateArticles(parsedData) {
    const container = document.getElementById('container');
    parsedData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item'; // You can apply CSS classes here
        div.innerHTML = `<h2>${item.name}</h2><p>${item.description}</p>`;
        container.appendChild(div);
    });
}