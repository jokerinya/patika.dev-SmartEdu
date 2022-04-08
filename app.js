// 3 party
const express = require('express');

require('dotenv').config();

const app = express();
app.get('/', async (req, res) => {
  res.status(200).send('Index page');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Listening At Port Number ${port}`);
});
