const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const { handleSignin } = require('./controllers/signin');
const handleRegister = require('./controllers/register');
const { profile } = require('./controllers/profile.js');
const { image, imageUrlApiCall } = require('./controllers/image.js');

const db = knex({
  client: 'pg',
  connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'password',
      database : 'smartbrain',
      port: '5000'
  }
});

db.select('*').from('users').then(data => {console.log(data)})

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))

//SIGNIN ROUTE
//I IMPLEMENTED A HIGHER ORDER FUNCTION HERE 
app.post('/signin',  handleSignin(db, bcrypt))


//IMAGE COUNT ROUTE
app.put('/image', (req, res) => image(req, res, db))
app.post('/imageUrl', (req, res) => imageUrlApiCall(req, res))


// I USED DEPENDENCY INJECTION FOR THE REGISTER ROUTE
app.post('/register',(req, res) => handleRegister(req, res, bcrypt, db))

//PROFILE ROUTE
app.get('/profile/:id', (req, res) => profile(req, res))


app.listen(8000, () => console.log('Exampl app listening on port 8000!'))
