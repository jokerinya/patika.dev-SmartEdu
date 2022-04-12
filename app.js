// 3 party
const express = require('express');
const ejs = require('ejs');

require('dotenv').config();

const app = express();
// Template engine
app.set('view engine', 'ejs');
// middlewares
app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', async (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
});
app.get('/about', async (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Listening At Port Number ${port}`);
});
