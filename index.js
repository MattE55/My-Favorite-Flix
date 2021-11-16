const express = require('express');
  morgan = require ('morgan');
  uuid = require ('uuid');

const app = express ();

const bodyParser = require('body-parser'),
  methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
  // logic
});

app.use(morgan('common'));

app.use(express.static('public'));

let movies = [
  {
    num: 1,
    title: 'Knives Out',
    genre: 'Mystery',
    director: 'Rian Johnson'
  },
  {
    num: 2,
    title: 'Reservoir Dogs',
    genre: 'Drama',
    director: 'Quentin Tarantino'
  },
  {
    num: 3,
    title: 'Shutter Island',
    genre: 'Thriller',
    director: 'Martin Scorsese'
  },
  {
    num: 4,
    title: 'Kung Fu Panda',
    genre: 'Animation',
    director: 'Mark Osborne'
  },
  {
    num: 5,
    title: 'Dolemite is my Name',
    genre: 'Comedy',
    director: 'Craig Brewer'
  },
  {
    num: 6,
    title: 'The Other Guys',
    genre: 'Comedy',
    director: 'Adam McKay'
  },
  {
    num: 7,
    title: 'Zodiac',
    genre: 'Mystery',
    director: 'David Fincher'
  },
  {
    num: 8,
    title: 'Polar',
    genre: 'Drama',
    director: 'Jonas Akerlund'
  },
  {
    num: 9,
    title: 'The Big Lebowski',
    genre: 'Comedy',
    director: 'The Coen Brothers'
  },
  {
    num: 10,
    title: 'The Ballad of Buster Scruggs',
    genre: 'Drama',
    director: 'The Coen Brothers'
  }
];

let directors = [
  {
    name: 'Rian Johnson',
    birthyear: '1973'
  },
  {
    name: 'Quentin Tarantino',
    birthyear: '1963'
  },
  {
    name: 'Martin Scorsese',
    birthyear: '1942'
  },
  {
    name: 'Mark Osborne',
    birthyear: '1970'
  },
  {
    name: 'Craig Brewer',
    birthyear: '1971'
  },
  {
    name: 'Adam McKay',
    birthyear: '1968'
  },
  {
    name: 'David Fincher',
    birthyear: '1962'
  },
  {
    name: 'Jonas Akerlund',
    birthyear: '1965'
  },
  {
    name: 'The Coen Brothers',
    birthyear: '1954 and 1957'
  }
]

let users = [
  {
    id: 1,
    username: 'John Smith'
  },
  {
    id: 2,
    username: 'Homer Simpson'
  }
]


// GET requests

app.get('/', (req, res) => {
  res.send('Welcome to my favorite flix!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});


//Returns a list of all movies to the user
app.get('/movies', (req, res) => {
  res.json(movies);
});


//Returns a list of all the users
app.get('/users', (req, res) => {
  res.json(users);
});

//Return Data about movie by title

app.get('/movies/:title', (req, res) => {
const movie = movies.find((movies) =>
    { return movies.title === req.params.title });
 if (movie) {

    res.status(201).send(movie);
  } else {
    res.status(404).send('Movie ' + req.params.name + ' not found.');
  }
});


//Returns data about a genre by title of movie
app.get('/movies/:title/genre', (req, res) => {
const movie = movies.find((movies) =>
    { return movies.title === req.params.title });
 if (movie) {
    res.status(201).send(movies.genre);
  } else {
    res.status(404).send('Movie ' + req.params.title + ' not found.');
  }
});


//Return Data about director by name

app.get('/directors/:name', (req, res) => {
const director = directors.find((directors) =>
    { return directors.name === req.params.name });
 if (director) {

    res.status(201).send(director);
  } else {
    res.status(404).send('Director ' + req.params.name + ' not found.');
  }
});


// Adds data for a new movie title to the list of movies
app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'missing title in request body';
    res.status(400).send(message);
  } else {
    newMovie.num = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});


// Deletes a movie from the list by title
app.delete('/movies/:title', (req, res) => {
  let movie = movies.find((movie) => {
    return movie.title === req.params.title
  });

  if (movie) {
    movies = movies.filter((obj) => { return obj.title !== req.params.title });
    res.status(201).send('Movie ' + req.params.title + ' was deleted.');
  } else {
    res.status(404).send('Movie ' + req.params.title + ' not found.');
  }
});

//Allow new users to register
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'missing username in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Update username
app.put('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.username[req.params.username] = parseInt(req.params.username);
    res.status(201).send('Username ' + req.params.username + ' was updated ');
  } else {
    res.status(404).send('Account with username ' + req.params.username + ' was not found.');
  }
});

// Existing users to deregister
app.delete('/users/:username', (req, res) => {
  const user = users.find((user) => {
    return user.username === req.params.username
  });
  if (user) {
    users = users.filter((obj) => { return obj.username !== req.params.username });
    res.status(201).send('User ' + req.params.username + ' was deleted.');
  } else {
    res.status(404).send('Username ' + req.params.username + ' not found.');
  }
})





// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
