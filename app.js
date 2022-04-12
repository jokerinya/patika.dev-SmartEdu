// 3 party
const express = require('express');
const ejs = require('ejs');

const pageRoute = require('./routes/pageRoutes');

require('dotenv').config();

const app = express();
// Template engine
app.set('view engine', 'ejs');
// middlewares
app.use(express.static(__dirname + '/public'));

//Routes
app.use('/', pageRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Listening At Port Number ${port}`);
});
