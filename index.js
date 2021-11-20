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
  console.error(err.stack);
  res.status(500).send(err);
});

app.use(morgan('common'));

app.use(express.static('public'));

let movies = [
  {
    movieid: 1,
    title: 'Knives Out',
    genre: 'Mystery',
    description: 'A  film about a detective who investigates the death of a patriarch of a disfunctional family.',
    director: 'Rian Johnson'
  },
  {
    movieid: 2,
    title: 'Reservoir Dogs',
    genre: 'Drama',
    description: 'A  film about the aftermath of a jewelry heist gone wrong. The surviving criminals do not know who to trust within each other',
    director: 'Quentin Tarantino'
  },
  {
    movieid: 3,
    title: 'Shutter Island',
    genre: 'Thriller',
    description: 'A US Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane',
    director: 'Martin Scorsese'
  },
  {
    movieid: 4,
    title: 'Kung Fu Panda',
    genre: 'Animation',
    description: 'Po, a lovable panda, has been chosen as protector of the Valley of Peace. Even though he is clumsy and overweight, he will learn to harness his power to fight his enemies.',
    director: 'Mark Osborne'
  },
  {
    movieid: 5,
    title: 'Dolemite is my Name',
    genre: 'Comedy',
    description: 'A comedy and rap pioneer who will do whatever he can to prove naysayers wrong and claim the fame he feels he deserves. He may also have a kung-fu fighting alter ego.',
    director: 'Craig Brewer'
  },
  {
    movieid: 6,
    title: 'The Other Guys',
    genre: 'Comedy',
    description: 'Two New York City detectives who could not be any different from each other take on the cities top cops and toughest cases.',
    director: 'Adam McKay'
  },
  {
    movieid: 7,
    title: 'Zodiac',
    genre: 'Mystery',
    description: 'A cartoonist becomes an amature detective obsessed with tracking down the infamous zodiac killer.',
    director: 'David Fincher'
  },
  {
    movieid: 8,
    title: 'Polar',
    genre: 'Drama',
    description: 'A retired hitman who has moved to a very seclude area to live in peace suddently finds himself being a target',
    director: 'Jonas Akerlund'
  },
  {
    movieid: 9,
    title: 'The Big Lebowski',
    genre: 'Comedy',
    description: 'Jeff Lebowski, aka The Dude, runs into trouble when a millionaire who has the same name is being targeted by debt collectors',
    director: 'The Coen Brothers'
  },
  {
    movieid: 10,
    title: 'The Ballad of Buster Scruggs',
    genre: 'Drama',
    description: 'A film which consists of several short films from the old western times. These films consist of gunslingers, bank robbers, a traveling act, an elderly gold digger, a wagon train, and some bounty hunters.',
    director: 'The Coen Brothers'
  }
];

let directors = [
  {
    directorid: 1,
    name: 'Rian Johnson',
    bio: 'Rian is an American film director, producer, and screenwriter. He made his directorial debut with the neo-noir mystery film Brick (2005), which received positive reviews and grossed nearly $4 million on a $450,000 budget.',
    birthyear: '1973',
    deathyear: '-'
  },
  {
    directorid: 2,
    name: 'Quentin Tarantino',
    bio: 'Quentin is an American film director, screenwriter, producer, film critic, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.',
    birthyear: '1963',
    deathyear: '-'
  },
  {
    directorid: 3,
    name: 'Martin Scorsese',
    bio: 'Martin is an American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the greatest and most influential directors in film history.',
    birthyear: '1942',
    deathyear: ''
  },
  {
    directorid: 4,
    name: 'Mark Osborne',
    bio: 'Mark began his career by studying Foundation Art at Pratt Institute in New York before receiving his Bachelor of Fine Arts Degree in Experimental Animation from the California Institute of the Arts in June 1992. His thesis film, Greener, won numerous awards and was screened at more than 40 film festivals worldwide.',
    birthyear: '1970',
    deathyear: '-'
  },
  {
    directorid: 5,
    name: 'Craig Brewer',
    bio: 'Craig is an American film director, producer, and screenwriter. His 2005 movie Hustle & Flow won the Audience Award at the 2005 Sundance Film Festival and achieved commercial success, along with an Academy Award for Best Original Song, Its Hard out Here for a Pimp.',
    birthyear: '1971',
    deathyear: '-'
  },
  {
    directorid: 6,
    name: 'Adam McKay',
    bio: 'Adam is an American film and television director, producer, screenwriter, and comedian. McKay began his career in the 1990s as a head writer for the NBC sketch comedy show Saturday Night Live for two seasons and is the co-founder of the Upright Citizens Brigade.',
    birthyear: '1968',
    deathyear: '-'
  },
  {
    directorid: 7,
    name: 'David Fincher',
    bio: 'David is an American film director. His films, mostly psychological thrillers and biographical dramas, have received 40 nominations at the Academy Awards, including three for him as Best Director.',
    birthyear: '1962',
    deathyear: '-'
  },
  {
    directorid: 8,
    name: 'Jonas Akerlund',
    bio: 'Jonas is a Swedish film director, screenwriter, music video director, and drummer. His video for Madonnas song Ray of Light won a Grammy Award for Best Music Video, Short Form, and a record of five awards at 1998 MTV Video Music Awards, including the Video of the Year.',
    birthyear: '1965',
    deathyear: ''
  },
  {
    directorid: 9,
    name: 'The Coen Brothers',
    bio: 'Joel Coen and Ethan Coen popularly known as the coen brothers are American film directors, producers, screenwriters, and editors. Their films span many genres and styles, which they frequently subvert or parody.',
    birthyear: '1954 and 1957',
    deathyear: ''
  }
]

let users = [
  {
    userid: 1,
    username: 'John Smith'
  },
  {
    userid: 2,
    username: 'Homer Simpson'
  },
  {
    userid: 3,
    username: 'Michelle Smith'
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
    res.status(200).send(movie.genre);
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
    newMovie.movieid = uuid.v4();
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
    newUser.userid = uuid.v4();
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
