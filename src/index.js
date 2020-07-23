const app = require('./server');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const usersDAO = require('./dao/usersDAO')
const postsDAO = require('./dao/postsDAO')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)

const users = require('./api/users.routes'); // Routes for users
const auth = require('./api/auth.routes'); // Routes for authentication



const port = 5000;




const ConnectApp = async () => {
  try {
    const client = await MongoClient.connect(
      process.env.DB_URI,
      { useNewUrlParser: true }
    )
    
      console.log('got client')


    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000000},
      store: new MongoStore({ client: client })
    })) 
    
    //Passport middleware
    app.use(passport.initialize())
    app.use(passport.session())


    app.use(cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    }));

    //Api routes
    app.use('/users', users);
    //app.use('/api/posts', posts);
    app.use('/auth', auth);



    await usersDAO.injectDB(client)
    await postsDAO.injectDB(client)

    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    }) 

  } catch (error) {
    console.error(err.stack)
    process.exit(1)
  }
}

ConnectApp();


/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000000},
  store: new MongoStore({ client: MongoClient })
})) 

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())



MongoClient.connect(
    process.env.DB_URI,
    { useNewUrlParser: true},
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await usersDAO.injectDB(client)
    await postsDAO.injectDB(client)
 
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    }) 
}) */
