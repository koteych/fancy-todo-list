
const API_URL = 'http://localhost:4400/api/todos';

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

    const url = `${API_URL}/date?from=${formattedStartDate}&to=${formattedEndDate}`;

    makeRequest(url, callback);
}

function getTodoByDate(date, callback) {
    const formattedDate = (new Date(date)).getTime();
    const millisPerDay = 86400000;

    const url = `${API_URL}/date?from=${formattedDate}&to=${formattedDate + millisPerDay}`;

    makeRequest(url, callback);
}

function getTodoByName(name, callback) {
    const url = `${API_URL}/find?q=${name}`;

    makeRequest(url, callback);
}

function getTodosForToday(callback) {
    getTodoByDate(new Date(), callback);
}

function getTodosForThisWeek(selectedDate, callback) {
    let date = new Date(selectedDate);

    let firstDayOfTheWeek = new Date(date);
    let lastDayOfTheWeek = new Date(date);

    let diff;

    let day = date.getDay();

    // it's sunday
    if (day === 0) {
      lastDayOfTheWeek = date;
      firstDayOfTheWeek.setDate(lastDayOfTheWeek.getDate() - 6);
    } else {
      day = date.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
      diff = date.getDate() - day + 1; // Calculate the difference to the first day of the week
      firstDayOfTheWeek = new Date(date.setDate(diff)); 
      lastDayOfTheWeek.setDate(firstDayOfTheWeek.getDate() + 6);
    }

    console.log(firstDayOfTheWeek);
    console.log(lastDayOfTheWeek);

    const url = `${API_URL}/date?from=${firstDayOfTheWeek.getTime()}&to=${lastDayOfTheWeek.getTime()}`;

    makeRequest(url, callback);
}