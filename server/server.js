// uses .env file that is gitignored for port instead of showing port
require('dotenv').config({ path: '../.env' });

// various requires
const express = require('express');
const path = require('path');

const port = process.env.PORT || 2000;

// express app
const app = express();

// always parses json
app.use(express.json());

// will serve the static assets in build folder in client side, (index.html will be able to use css and bundle.js)
app.use(express.static(path.resolve(__dirname, '../client/build')));

// on visiting homepage, send index.html file
app.get('/*', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

// 404
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// global err handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
