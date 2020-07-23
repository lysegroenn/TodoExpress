require('dotenv').config()
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const cors = require('cors');
const morgan = require('morgan');
const users = require('./api/users.routes'); // Routes for users
//const posts = require('./api/posts.routes'); // Routes for posts
const auth = require('./api/auth.routes'); // Routes for authentication

console.log(process.env.GOOGLE_CLIENT_ID)

//Passport config
require('../config/passport')(passport)


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.disable('x-powered-by')
//app.use(cors());

//Logging
app.use(morgan('dev'))


module.exports = app;