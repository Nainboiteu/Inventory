fetch('db/data.json')
    .then(response => response.json())
    .then(parsedData => {
        // Log the parsed JSON data to the console
        console.log(parsedData);
        //generateArticles(parsedData);

        // You can also use JSON.stringify for formatted output
        console.log(JSON.stringify(parsedData, null, 2));
    })
    .catch(error => {
        console.error('Error fetching or parsing JSON:', error);
    });


var parsedTest = [
    {
        "ID": "0123456",
        "name": "Perceuse DEWALT",
        "date": 1693214313989,
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!",
        "quantity": 1,
        "localisation": "SDB #1",
        "sublocalisation": "Placard2",
        "serial": "SD1-PL2-0123456",
        "pic":"1000.jpg",
        "favorite":true,
        "refill":false,
        "state":"Neuf",
        "oldLocal":"",
        "oldSubLocal":"",
        "oldSerial":""

    },
    {
        "ID": "0123457",
        "name": "Lubrification Moteur",
        "date": 1693114313989,
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!",
        "quantity": 10,
        "localisation": "SDB #1",
        "sublocalisation": "Placard1",
        "serial": "SD1-PL1-0123457",
        "pic":"1000.jpg",
        "favorite":true,
        "refill":false,
        "state":"Neuf",
        "oldLocal":"",
        "oldSubLocal":"",
        "oldSerial":""
    },
    {
        "ID": "0123458",
        "name": "Projecteur HDMI",
        "date": 1693314313989,
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!",
        "quantity": "5",
        "localisation": "Cabine #1",
        "sublocalisation": "Penderie #1",
        "serial": "CA1-PE1-0123458",
        "pic":"1000.jpg",
        "favorite":true,
        "refill":true,
        "state":"Neuf",
        "oldLocal":"",
        "oldSubLocal":"",
        "oldSerial":""
    }
];

function getCurrentTimestamp() {
    return Date.now();
}
console.log(getCurrentTimestamp());
function getHumaneDate(timestamp) {
    const locale = 'fr-FR'; // French locale

    const options = {
        weekday: 'long', // Display the full weekday name
        day: 'numeric', // Display the day of the month
        month: 'long', // Display the full month name
        year: 'numeric' // Display the year
    };

    const formattedDate = new Intl.DateTimeFormat(locale, options).format(new Date(timestamp));
    // Capitalize the first letter of each word
    const capitalizedDate = formattedDate.split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(' ');

    return capitalizedDate
}

generateArticles(parsedTest);
function generateArticles(parsedData) {
    const container = document.getElementById('articleContainer');
    parsedData.forEach(item => {
        var humaneDate = getHumaneDate(item.date);
        console.log(humaneDate);
        const article = document.createElement('article');
        article.className = 'postcard dark blue';
        article.innerHTML = `<a class="postcard__img_link" href="#"> <img class="postcard__img" src="db/img/${item.pic}" alt="Image ${item.ID}" />`
        + `</a> <div class="postcard__text"> <h1 class="postcard__title blue cardTitle"><a href="#">${item.name}</a></h1> <div class="postcard__subtitle small">`
        + `<time datetime="${item.date}"> <i class="fas fa-calendar-alt mr-2 tag"></i>${humaneDate}</time> </div> <div class="postcard__bar"></div>`
        + `<div class="postcard__preview-txt">${item.description}</div> <ul class="postcard__tagbox" id="tagbox">`
        + `<li class="tag__item"><i class="fas fa-tag mr-2 tag"></i>${item.localisation}</li>`
        + `<li class="tag__item"><i class="fas fa-tag mr-2 tag"></i>${item.sublocalisation}</li>`
        + `<li class="tag__item"><i class="fas mr-2 tag"></i>x ${item.quantity}</li> `
        + `<li class="tag__item"><i class="fas fa-fill-drip mr-2 tag" ${item.refill ? 'style="padding-left:5px;"' : 'style="padding-left:5px;color:#777575"'}></i></li>`
        + `<li class="tag__item"><i class="fas fa-solid fa-star mr-2 tag" ${item.favorite ? 'style="padding-left:5px;"' : 'style="padding-left:5px;color:#777575"'}></i></li>`
        + `<li class="tag__item play blue"> <a href="#"><i class="fas fa-pen-to-square mr-2 tag"></i>Edit</a> </li>`
        + `</ul> </div>`;
        container.appendChild(article);
    });
}