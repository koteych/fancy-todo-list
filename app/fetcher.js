function getSome() {
    console.log('get some');
}

function makeRequest(url, callback) {
    console.log('Performing a query: ' + url);
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      callback(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

function getTodosByDateRange(startDate, endDate) {
    const formattedStartDate = (new Date(startDate)).getTime();
    const formattedEndDate = (new Date(endDate)).getTime();

    const url = `http://localhost:4400/api/todos/date?from=${formattedStartDate}&to=${formattedEndDate}`;
    console.log(url);

    makeRequest(url, callback);
}

function getTodoByDate(date, callback) {
    const formattedDate = (new Date(date)).getTime();
    const millisPerDay = 86400000;

    const url = `http://localhost:4400/api/todos/date?from=${formattedDate}&to=${formattedDate + millisPerDay}`;
    console.log(url);

    makeRequest(url, callback);
}

function getTodoByName(name, callback) {
    const url = `http://localhost:4400/api/todos/find?q=${name}`;
    console.log(url);

    makeRequest(url, callback);
}

function getTodosForToday(callback) {
    getTodoByDate(new Date(), callback);
}

/** This is not what we're looking for by the way */
function getTodosForNextWeek(callback) {
    const formattedDate = (new Date(date)).getTime();
    const millisPerWeek = 86400000*7;

    const url = `http://localhost:4400/api/todos/date?from=${formattedDate}&to=${formattedDate + millisPerWeek}`;
    console.log(url);

    makeRequest(url, callback);
}