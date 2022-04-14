// 3 party
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

require('dotenv').config();

const app = express();

// Connect DB
(async () => {
  try {
    await mongoose.connect(process.env.LOCAL_TEST_DB);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
  }
})();

// Template engine
app.set('view engine', 'ejs');
// middlewares
app.use(express.static(__dirname + '/public')); // serving the static files
// parsing requests with urlencoded body payloads
app.use(express.urlencoded({ extended: true }));
// parsing requests with JSON body payloads
app.use(express.json());

//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Listening At Port Number ${port}`);
});
