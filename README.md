### My Favorite Flix API

Hello! I am an aspiring web developer and this is a movie API I created to, in tern, create clients with different frameworks to practice.

### Description

My Favorite Flix, A Movie API

Server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

### Essential Features

- Return a list of all movies to the user
- Return data about the movies (title, genre and description)
- Return data about a genre (description)
- Return data about a director (bio, birthdate)
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to delete their account

### Technical Requirements

- The API must be a Node.js application
- The API must use REST architecture, with URL endpoints corresponding to the data operations listed above
- The API must use a “package.json” file
- The database must be built using MongoDB
- The business logic must be modeled with Mongoose
- The API must provide movie information in JSON format
- The JavaScript code must be error-free
- The API must be tested in Postman
- The API must include user authentication and authorization code

### Endpoints

- /users
- /users/[Username]
- /users/[Username]/movies
- /users/[Username]/movies/[MovieID]
- /movies
- /movies/[Title]
- /genre/[Name]
- /directors/[Name]

### Dependencies

- "@types/bcrypt": "^5.0.0",
- "bcrypt": "^5.0.1",
- "bcryptjs": "^2.4.3",
- "body-parser": "^1.19.0",
- "cors": "^2.8.5",
- "express": "^4.17.1",
- "express-validator": "^6.14.0",
- "jsonwebtoken": "^8.5.1",
- "lodash": "^4.17.21",
- "method-override": "^3.0.0",
- "mongoose": "^6.1.1",
- "morgan": "^1.10.0",
- "passport": "^0.5.2",
- "passport-jwt": "^4.0.0",
- "passport-local": "^1.0.0",
- "uuid": "^8.3.2"

### devDependencies

- "eslint": "^8.1.0"

### Tecnologies:

- Javascript
- HTML
- Node.js
- Express
- MongoDB
- Mongoose
- Heroku

**To run app**
`npm start`
