const express = require('express');
  morgan = require ('morgan');

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

let topMovies = [
  {
    title: '',
    director: ''
  },
  {
    title: '',
    director: ''
  },
  {
    title: '',
    director: ''
  }
];

// GET requests

app.get('/', (req, res) => {
  res.send('Welcome to my favorite flix!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
