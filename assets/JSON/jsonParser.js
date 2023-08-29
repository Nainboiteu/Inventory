fetch('db/data.json')
  .then(response => response.json())
  .then(parsedData => {
    // Log the parsed JSON data to the console
    console.log(parsedData);
    
    // You can also use JSON.stringify for formatted output
    console.log(JSON.stringify(parsedData, null, 2));
  })
  .catch(error => {
    console.error('Error fetching or parsing JSON:', error);
  });