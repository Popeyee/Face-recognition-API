const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex')
const register = require ('./controllers/register.js')
const singin = require ('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');


// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString : process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   }
// });

const db = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
  debug: true,
});

// db.select('*').from('users');

const app = express();

app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {res.send('it is working')})

app.post('/signin', (req, res) => { singin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
	console.log(`app is working ${process.env.PORT}`);
})















