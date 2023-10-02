const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/password');
const updateinfo = require('./controllers/updateinfo');
const admin = require('./controllers/admin');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password: 'saumya1999',
      database : 'CS518'
    }
  });

/* db.select('*').from('users').then(data => {
  console.log(data);
}) */

const app = express();

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res)=> { res.send(db.users) })
app.get('/admin', (req, res) => { admin.handleAdmin(req, res, db)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.post('/password', (req, res) => { profile.handlePassword(req, res, db, bcrypt)})
app.post('/updateinfo', (req, res) => { updateinfo.handleInfo(req, res, db)})

app.listen(5000, ()=> {
  console.log(`app is running on port 5000`);
})