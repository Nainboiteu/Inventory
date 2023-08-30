// Constants
const optimizeSaveButton = document.getElementById('saveArticle');
var ogData;
const baseURL = "http://192.168.1.31:7777";
var parsedTest = [
    {
        "ID": "0123456",
        "name": "Perceuse DEWALT",
        "type": "Outil",
        "date": 1693214313989,
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!",
        "quantity": "1",
        "location": "SDB #1",
        "sublocation": "Placard2",
        "serial": "SD1-PL2-0123456",
        "pic": "",
        "favorite": false,
        "refill": false,
        "state": "Neuf",
        "oldLocal": "",
        "oldSubLocal": "",
        "oldSerial": ""

    },
    {
        "ID": "0123457",
        "name": "Lubrification Moteur",
        "type": "Moteur",
        "date": 1693114313989,
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!",
        "quantity": "10",
        "location": "SDB #1",
        "sublocation": "Placard1",
        "serial": "SD1-PL1-0123457",
        "pic": "1000.jpg",
        "favorite": true,
        "refill": false,
        "state": "Neuf",
        "oldLocal": "",
        "oldSubLocal": "",
        "oldSerial": ""
    },
    {
        "ID": "0123458",
        "name": "Projecteur HDMI",
        "type": "Électronique",
        "date": 1693314313989,
        "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!",
        "quantity": "5",
        "location": "Cabine #1",
        "sublocation": "Penderie #1",
        "serial": "CA1-PE1-0123458",
        "pic": "1000.jpg",
        "favorite": false,
        "refill": true,
        "state": "Neuf",
        "oldLocal": "",
        "oldSubLocal": "",
        "oldSerial": ""
    }
];

// Functions
function getAllArticles() {
    fetch('db/data.json')
        .then(response => response.json())
        .then(parsedData => {
            // Log the parsed JSON data to the console
            console.log(parsedData);
            //return parsedData
            generateArticles(parsedData);
            addEntriesToMultiSelects(parsedData);
	    ogData = parsedData;
	    return parsedData;

            // You can also use JSON.stringify for formatted output
            //console.log(JSON.stringify(parsedData, null, 2));
        })
        .catch(error => {
            console.error('Error fetching or parsing JSON:', error);
        });

}

function getCurrentTimestamp() {
    return Date.now();
}

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

function generateArticles(parsedData) {
    const container = document.getElementById('articleContainer');
    parsedData.forEach(item => {
        var humaneDate = getHumaneDate(item.date);
        //console.log(humaneDate);
        const article = document.createElement('article');
        article.setAttribute('id', 'articleCreated-' + item.ID);
        article.className = 'postcard dark yellow';
        article.innerHTML = `<a class="postcard__img_link" href="#"> <img class="postcard__img" src="db/img/${item.pic ? item.pic : '1000.jpg'}" alt="Image ${item.ID}" />`
            + `</a> <div class="postcard__text"> <h1 class="postcard__title yellow cardTitle"><a href="#">&nbsp;[${item.type}] ${item.name}</a></h1> <div class="postcard__subtitle small">`
            + `<div> <i class="fas fa-hashtag mr-2 tag"></i>${item.ID}</div>`
            + `<time datetime="${item.date}"> <i class="fas fa-calendar-alt mr-2 tag"></i>${humaneDate}</time> </div> <div class="postcard__bar"></div>`
            + `<div class="postcard__preview-txt"><div class="row"><div class="col-3 d-flex align-items-center" style="min-width:100px;max-width:120px;"><div class="QR" id="QR-${item.ID}"></div></div><div class="col">${item.description}</div></div></div>`
            + `<ul class="postcard__tagbox" id="tagbox"><li class="tag__item"><i class="fas fa-tag mr-2 tag"></i>${item.location}</li>`
            + `<li class="tag__item"><i class="fas fa-tag mr-2 tag"></i>${item.sublocation}</li>`
            + `<li class="tag__item"><i class="fas mr-2 tag"></i>x ${item.quantity}</li> `
            + `<li class="tag__item"><i class="fas fa-fill-drip mr-2 tag" ${item.refill ? 'style="padding-left:5px;"' : 'style="padding-left:5px;color:#777575"'}></i></li>`
            + `<li class="tag__item"><i class="fas fa-solid fa-star mr-2 tag" ${item.favorite ? 'style="padding-left:5px;"' : 'style="padding-left:5px;color:#777575"'}></i></li>`
            // Uncommnet next line when editing is live
            //+ `<li class="tag__item play yellow"> <a href="#"><i class="fas fa-pen-to-square mr-2 tag"></i>Edit</a> </li>`
            + `</ul>`
            + `<div class="QR" id="QR-${item.ID}"></div> </div>`;
        container.appendChild(article);
        generateQRDisplay(item.ID, baseURL + "?article=" + item.ID);
    });
    var resultRow = document.getElementById("resultRow");
    resultRow.innerHTML = parsedData.length + " entries.";
}


// On Load
// Generate full Article List and display them

// Uncomment when live
var ogData = getAllArticles();
//console.log(getAllArticles());
//generateArticles(ogData);


//generateArticles(parsedTest);
//var ogData = parsedTest;
/*console.log("getUniqueType");
console.log(getUniqueType(ogData));
console.log("getUniqueLocations");
console.log(getUniqueLocation(ogData));
console.log("getUniqueSubLocations");
console.log(getUniqueSublocations(ogData));
console.log("getUniqueQuantities");
console.log(getUniqueQuantities(ogData));*/
//addEntriesToMultiSelects(ogData);

// Generate list in multi selects
function getUniqueType(parsedJSON) {
    // Create a Set to store unique types
    const uniqueTypes = new Set();

    // Iterate through the JSON array
    parsedJSON.forEach(item => {
        uniqueTypes.add(item.type); // Add the "type" value to the Set
    });

    // Convert the Set back to an array
    const uniqueTypeArray = Array.from(uniqueTypes);
    return uniqueTypeArray
}
function getUniqueLocation(parsedJSON) {
    // Create a Set to store unique locations
    const uniqueLocations = new Set();

    // Iterate through the JSON array
    parsedJSON.forEach(item => {
        uniqueLocations.add(item.location); // Add the "type" value to the Set
    });

    // Convert the Set back to an array
    const uniqueLocationsArray = Array.from(uniqueLocations);
    return uniqueLocationsArray
}
function getUniqueSublocations(parsedJSON) {
    // Create a Set to store unique Sublocations
    const uniqueSublocations = new Set();

    // Iterate through the JSON array
    parsedJSON.forEach(item => {
        uniqueSublocations.add(item.sublocation); // Add the "type" value to the Set
    });

    // Convert the Set back to an array
    const uniqueSublocationsArray = Array.from(uniqueSublocations);
    return uniqueSublocationsArray
}
function getUniqueQuantities(parsedJSON) {
    // Create a Set to store unique Quantities
    const uniqueQuantities = new Set();

    // Iterate through the JSON array
    parsedJSON.forEach(item => {
        uniqueQuantities.add(item.quantity); // Add the "type" value to the Set
    });

    // Convert the Set back to an array
    const uniqueQuantitiesArray = Array.from(uniqueQuantities);
    return uniqueQuantitiesArray
}
function addEntriesToMultiSelects(parsedJSON) {
    // Get Unique Values
    var types = getUniqueType(parsedJSON);
    console.log(types);
    var locations = getUniqueLocation(parsedJSON);
    var sublocations = getUniqueSublocations(parsedJSON);
    var quantities = getUniqueQuantities(parsedJSON);
    console.log("parsedJSON Add Unique");	
    console.log(parsedJSON);

    // Add entries
    for (let i = 0; i < types.length; i++) {
        const container = document.getElementById('filterType');
        const option = document.createElement('option');
        option.setAttribute("data-tokens", types[i]);
        option.innerHTML = types[i];
        container.appendChild(option);
    }
    for (let i = 0; i < quantities.length; i++) {
        const container = document.getElementById('filterQuantity');
        const option = document.createElement('option');
        option.setAttribute("data-tokens", quantities[i]);
        option.innerHTML = quantities[i];
        container.appendChild(option);
    }
    for (let i = 0; i < locations.length; i++) {
        const container = document.getElementById('filterLocation');
        const option = document.createElement('option');
        option.setAttribute("data-tokens", locations[i]);
        option.innerHTML = locations[i];
        container.appendChild(option);
    }
    for (let i = 0; i < sublocations.length; i++) {
        const container = document.getElementById('filterSubLocation');
        const option = document.createElement('option');
        option.setAttribute("data-tokens", sublocations[i]);
        option.innerHTML = sublocations[i];
        container.appendChild(option);
    }
    $('#filterType').selectpicker('refresh');
    $('#filterQuantity').selectpicker('refresh');
    $('#filterLocation').selectpicker('refresh');
    $('#filterSubLocation').selectpicker('refresh');
}


//Show/Hide Filters
function toggleFilters(event) {
    const box = document.getElementById('filtersBox');

    if (box.style.display === 'none') {
        box.style.display = 'block';
    } else {
        box.style.display = 'none';
    }
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}

function getSelectedValues(dataId) {
    // Find the button element with the specified data-id
    var button = document.querySelector('[data-id="' + dataId + '"]');

    // Find the associated dropdown list
    var dropdownListId = button.getAttribute('aria-owns');
    var dropdownList = document.getElementById(dropdownListId);

    // Find selected items within the dropdown list
    var selectedItems = dropdownList.querySelectorAll('[aria-selected="true"]');

    // Extract selected values and store in an array
    var selectedValues = [];
    selectedItems.forEach(function (item) {
        selectedValues.push(item.textContent.trim());
    });

    return selectedValues;
}

filterData(ogData);
// On Demand
// When filtered, reduce the parsedData list. Click on reset to see the full list again.
function resetFilters() {
    $('#filterType').selectpicker('deselectAll');
    $('#filterQuantity').selectpicker('deselectAll');
    $('#filterLocation').selectpicker('deselectAll');
    $('#filterSubLocation').selectpicker('deselectAll');
    var checkboxFavorite = document.getElementById("flexSwitchCheckFavorite");
    checkboxFavorite.checked = false;
    var checkboxRefill = document.getElementById("flexSwitchCheckRefill");
    checkboxRefill.checked = false;
}
function filterData(parsedJSON) {
	if(parsedJSON) {
    var ogJSONLength = parsedJSON.length;
    // Get Filters Values
    var filterTypeValues = getSelectedValues("filterType");
    var filterQuantitiesValues = getSelectedValues("filterQuantity");
    var filterLocationValues = getSelectedValues("filterLocation");
    var filterSubLocationValues = getSelectedValues("filterSubLocation");
    // Toggles
    var checkboxFavorite = document.getElementById("flexSwitchCheckFavorite");
    var favIsChecked = checkboxFavorite.checked;
    var checkboxRefill = document.getElementById("flexSwitchCheckRefill");
    var refillIsChecked = checkboxRefill.checked;

    /*console.log("values");
    console.log(filterTypeValues);
    console.log(filterQuantitiesValues);
    console.log(filterLocationValues);
    console.log(filterSubLocationValues);
    console.log("Fav " + favIsChecked);
    console.log("Refill " + refillIsChecked);*/

    // Filter Data based on the filters

    if (filterTypeValues.length > 0) {
        var typeFilteredJSON = parsedJSON.filter(element => filterTypeValues.includes(element.type));
    } else {
        var typeFilteredJSON = parsedJSON;
    }

    if (filterQuantitiesValues.length > 0) {
        var QuantitiesFilteredJSON = typeFilteredJSON.filter(element => filterQuantitiesValues.includes(element.quantity));
    } else {
        var QuantitiesFilteredJSON = typeFilteredJSON;
    }

    if (filterLocationValues.length > 0) {
        var locationFilteredJSON = QuantitiesFilteredJSON.filter(element => filterLocationValues.includes(element.location));
    } else {
        locationFilteredJSON = QuantitiesFilteredJSON;
    }

    if (filterSubLocationValues.length > 0) {
        var sublocationFilteredJSON = locationFilteredJSON.filter(element => filterSubLocationValues.includes(element.sublocation));
    } else {
        var sublocationFilteredJSON = locationFilteredJSON;
    }
    var finalFilteredJSON = sublocationFilteredJSON;
    /*console.log(parsedJSON);
    console.log(finalFilteredJSON);*/

    // Remove all articles
    var articlesToRemove = document.querySelectorAll('article[id^="articleCreated-"]');
    articlesToRemove.forEach(function (article) {
        // Remove the div element from the DOM
        article.remove();
    });
    //console.log(articlesToRemove);

    // Push only filtered articles
    generateArticles(finalFilteredJSON);
    var filteredJSONLength = finalFilteredJSON.length;
    var resultRow = document.getElementById("resultRow");
    resultRow.innerHTML = filteredJSONLength + " out of a total of " + ogJSONLength + " entries.";
}
}


// Add function to create new articles and generate the QR Code before saving. Ability to save and create a new article. In a modal.
// Add a way to crop images when creating a new article.
//Pic Upload
var pictureUploadInput = document.getElementById('pictureUpload');
var picturePlaceholder = document.getElementById('picturePlaceholder');

pictureUploadInput.addEventListener('change', function (event) {
    var selectedFile = event.target.files[0]; // Get the selected file

    if (selectedFile) {
        // Create a new image element
        var imageElement = document.createElement('img');
        imageElement.setAttribute('id','preUploadPic');
        imageElement.src = URL.createObjectURL(selectedFile); // Create a URL for the selected file

        // Replace the content of the placeholder with the image element
        picturePlaceholder.innerHTML = '';
        picturePlaceholder.appendChild(imageElement);
    }
});

function generateUniqueID(timestamp) {
    var randomPart = Math.floor(Math.random() * 10000); // Add a random number for uniqueness
    var uniqueID = timestamp + '-' + randomPart;
    return uniqueID;
}

function generateTimestamp() {
    var timestamp = new Date().getTime(); // Get current timestamp in milliseconds
    return timestamp;
}

function addNewArticle() {
 const fileInput = document.getElementById('pictureUpload');
  var timestamp = generateTimestamp();
  var uniqueID = generateUniqueID(timestamp);
  var dataArray = []; // Create an array to hold the data objects

  // Get and Optimize the Image
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        // Image optimization code...
        const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const maxWidth = 200;
                const maxHeight = 250;

                let newWidth = image.width;
                let newHeight = image.height;

                if (image.width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = (image.height * maxWidth) / image.width;
                }

                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = (image.width * maxHeight) / image.height;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(image, 0, 0, newWidth, newHeight);

                const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                console.log(optimizedBase64);

        // Get the Article Values
        var typeInput = document.getElementById('type');
        var nameInput = document.getElementById('name');
        var descriptionInput = document.getElementById('description');
        var locationInput = document.getElementById('location');
        var sublocationInput = document.getElementById('sublocation');
        var quantityInput = document.getElementById('quantity');
        var dateInput = document.getElementById('date');
        var stateInput = document.getElementById('state');

        var dataObject = {
          ID: uniqueID,
          name: nameInput.value,
          type: typeInput.value,
          date: timestamp,
          description: descriptionInput.value,
          quantity: parseInt(quantityInput.value),
          location: locationInput.value,
          sublocation: sublocationInput.value,
          serial: "to be filled",
          pic: optimizedBase64,
          favorite: false,
          refill: false,
          state: stateInput.value,
          oldLocal: "",
          oldSubLocal: "",
          oldSerial: ""
        };

        // Push the data object into the array
        dataArray.push(dataObject);
        console.log(dataArray);
        
        // Send Request to save the file

    
          const jsonData = JSON.stringify(dataArray, null, 2); // Indented formatting
          const filename = 'data.json';
    
          fetch('assets/php/save-json.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'jsonData=' + encodeURIComponent(jsonData) + '&filename=' + encodeURIComponent(filename)
          })
          .then(response => response.json())
          .then(data => {
            console.log(dataArray);
          })
          .catch(error => {
            console.error('Error when sending json.data:', error);
          });
        // Closing Modal and clearing the fields
        clearFieldsModal();
        $('#addArticleModal').modal('hide');
        console.log(dataArray);
      };
    };

    reader.readAsDataURL(file);
  }
}

function clearFieldsModal() {
    // Clear text inputs
    document.getElementById('type').value = '';
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('location').value = '';
    document.getElementById('sublocation').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('date').value = '';
    document.getElementById('state').value = '';
    
    // Clear uploaded image (file input)
    var pictureUploadInput = document.getElementById('pictureUpload');
    pictureUploadInput.value = null; // Reset the selected file
    const preUploadPic = document.getElementById("preUploadPic");
    preUploadPic.remove();
}
// Save changes new/edit
// eg: floating button to save when there is article to save
// make a copy of the original, save it by adding the timestamp and replace the db.json with the new one.

// Add function to modify current articles + click on favorite to make it a favorite

// Add security when closing/refreshing the page to save changes (alert JS if in the creation/edit modal)

