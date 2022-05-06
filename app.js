// 3 party
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

require('dotenv').config();

const app = express();

// Connect DB
(async () => {
  try {
    await mongoose.connect(process.env.REAL_DB);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
  }
})();

// Template engine
app.set('view engine', 'ejs');

// Global Variables
global.userIN = null;

// middlewares
app.use(express.static(__dirname + '/public')); // serving the static files
// parsing requests with urlencoded body payloads
app.use(express.urlencoded({ extended: true }));
// parsing requests with JSON body payloads
app.use(express.json());
// session
app.use(
  session({
    secret: 'jokerinya_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.LOCAL_TEST_DB }),
  })
);
// flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
// method override for browser requests
app.use(
  // url will be '?_method='
  methodOverride('_method', {
    methods: ['POST', 'GET'], // also override post and get requests
  })
);

//Routes
// checks and adds value to userIN variable
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Listening At Port Number ${port}`);
});
