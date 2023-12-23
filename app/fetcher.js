function getSome() {
    console.log('get some');
}

function makeRequest(url, callback) {
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