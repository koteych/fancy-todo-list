function getSome() {
    console.log('get some');
}

function getTodoByDate(date, callback) {
    const formattedDate = (new Date(date)).getTime();

    const url = `http://localhost:4400/api/todos/date?from=${formattedDate}&to=${formattedDate + 86400000}`;
    console.log(url);

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