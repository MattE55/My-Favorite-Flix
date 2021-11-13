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
    director: 'Rian Johnson'
  },
  {
    num: 2,
    title: 'Reservoir Dogs',
    director: 'Quentin Tarantino'
  },
  {
    num: 3,
    title: 'Shutter Island',
    director: 'Martin Scorsese'
  },
  {
    num: 4,
    title: 'Kung Fu Panda',
    director: 'Mark Osborne'
  },
  {
    num: 5,
    title: 'Dolemite is my Name',
    director: 'Craig Brewer'
  },
  {
    num: 6,
    title: 'The Other Guys',
    director: 'Adam McKay'
  },
  {
    num: 7,
    title: 'Zodiac',
    director: 'David Fincher'
  },
  {
    num: 8,
    title: 'Polar',
    director: 'Jonas Akerlund'
  },
  {
    num: 9,
    title: 'The Big Lebowski',
    director: 'The Coen Brothers'
  },
  {
    num: 10,
    title: 'The Ballad of Buster Scruggs',
    director: 'The Coen Brothers'
  }
];

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

//Returns data about a genre by title of movie
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.genre === req.params.genre }));
});


//Return Data about director by name
app.get('/movies/:director', (req, res) => {
  res.json(movies.find((movies) =>
    { return movies.director === req.params.director }));
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
  }
})



// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
