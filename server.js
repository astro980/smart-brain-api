const express =require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const  knex = require('knex');

const register  = require('./controllers/register');
const signin    = require('./controllers/signin');
const profile   = require('./controllers/profile');
const image     = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL = 0,
        ssl: true
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Get Root base 
app.get('/', (req, res) => { res.send('it is working!') })

// SIGN IN POST
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

// REGISTER POST
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) })

// GET Info About the User Once Register
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// Uploading or Putting image to Front and Back and Update
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

//Posting API code in Back for security 
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port $`process.env.PORT`')
})








