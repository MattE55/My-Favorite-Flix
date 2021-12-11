const express = require('express');
  morgan = require ('morgan');
  uuid = require ('uuid');

const app = express ();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/MyFavFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

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

/*let movies = [
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
    Name: 'The Coen Brothers',
    Bio: 'Joel Coen and Ethan Coen popularly known as the coen brothers are American film directors, producers, screenwriters, and editors. Their films span many genres and styles, which they frequently subvert or parody.',
    Birthyear: '1954 and 1957',
    Deathyear: ''
  }
]

let users = [
  {
    userid: 1,
    username: 'JohnnySmith',
    Password: 'securepass123',
    Email: 'JSmith@probablygmail.com',
    Birthday: '1982-03-20',
  },
  {
    userid: 2,
    username: 'HomerSimpson',
    Password: 'Dohdoh',
    Email: 'homer@thepowerplant.com',
    Birthday: '1956-05-12',
  },
  {
    userid: 3,
    username: 'MichelleS',
    Password: 'reallysecurepass',
    Email: 'MSmith@probablygmail.com',
    Birthday: '1983-05-18',
  },
  {
    userid: 4,
    username: 'dramaexpert',
    Password: 'totallynottheircatsname',
    Email: 'drama@probablygmail.com',
    Birthday: '1995-08-02',
  },
  {
    userid: 5,
    username: 'movielover99',
    Password: 'blackandwhite',
    Email: 'movielover@probablygmail.com',
    Birthday: '1990-09-15',
  }
]*/


// GET requests

app.get('/', (req, res) => {
  res.send('Welcome to my favorite flix!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});


//Returns a list of all movies to the user
/*app.get('/movies', (req, res) => {
  res.json(movies);
});*/


app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Returns a list of all the users
/*app.get('/users', (req, res) => {
  res.json(users);
});*/

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Return Data about movie by title

/*app.get('/movies/:title', (req, res) => {
const movie = movies.find((movies) =>
    { return movies.title === req.params.title });
 if (movie) {

    res.status(201).send(movie);
  } else {
    res.status(404).send('Movie ' + req.params.name + ' not found.');
  }
});*/

// Get movie by title

app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//Returns data about a genre by title of movie
/*app.get('/movies/:title/genre', (req, res) => {
const movie = movies.find((movies) =>
    { return movies.title === req.params.title });
 if (movie) {
    res.status(200).send(movie.genre);
  } else {
    res.status(404).send('Movie ' + req.params.title + ' not found.');
  }
});*/

app.get('/movies/Genre/:Name', (req, res) => {
  Movies.findOne({ 'Genre.Name' : req.params.Name })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//Return Data about director by name

/*app.get('/directors/:name', (req, res) => {
const director = directors.find((directors) =>
    { return directors.name === req.params.name });
 if (director) {

    res.status(201).send(director);
  } else {
    res.status(404).send('Director ' + req.params.name + ' not found.');
  }
});*/

app.get('/director/:Name', (req, res) => {
  Movies.findOne({ 'Director.Name' : req.params.Name })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Adds data for a new movie title to the list of movies
/*app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'missing title in request body';
    res.status(400).send(message);
  } else {
    newMovie.movieid = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});*/

app.post('/movies', (req, res) => {
  Movies.findOne({ Title: req.body.Title })
    .then((movie) => {
      if (movie) {
        return res.status(400).send(req.body.Title + 'already exists');
      } else {
        Movies
          .create({
            Title: req.body.Title,
            Description: req.body.Description,
            Genre: req.body.Genre,
            Director: req.body.Director,
            ImagePath: req.body.ImagePath,
          })
          .then((movie) =>{res.status(201).json(movie) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// Deletes a movie from the list by title
/*app.delete('/movies/:title', (req, res) => {
  let movie = movies.find((movie) => {
    return movie.title === req.params.title
  });

  if (movie) {
    movies = movies.filter((obj) => { return obj.title !== req.params.title });
    res.status(201).send('Movie ' + req.params.title + ' was deleted.');
  } else {
    res.status(404).send('Movie ' + req.params.title + ' not found.');
  }
});*/



app.delete('/movies/:Title', (req, res) => {
  Movies.findOneAndRemove({ Title: req.params.Title })
    .then((movie) => {
      if (!movie) {
        res.status(400).send(req.params.Title + ' was not found');
      } else {
        res.status(200).send(req.params.Title + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Allow new users to register
/*app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'missing username in request body';
    res.status(400).send(message);
  } else {
    newUser.userid = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});*/

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// Update username
/*app.put('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username });

  if (user) {
    user.username[req.params.username] = parseInt(req.params.username);
    res.status(201).send('Username ' + req.params.username + ' was updated ');
  } else {
    res.status(404).send('Account with username ' + req.params.username + ' was not found.');
  }
});*/

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Remove a movie to a user's list of favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username }, {
     $delete: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// Existing users to deregister
/*app.delete('/users/:username', (req, res) => {
  const user = users.find((user) => {
    return user.username === req.params.username
  });
  if (user) {
    users = users.filter((obj) => { return obj.username !== req.params.username });
    res.status(201).send('User ' + req.params.username + ' was deleted.');
  } else {
    res.status(404).send('Username ' + req.params.username + ' not found.');
  }
})*/

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});








// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
