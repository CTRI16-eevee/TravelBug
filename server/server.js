// uses .env file that is gitignored for port instead of showing port
require('dotenv').config({ path: '../.env' });
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const feedRoutes = require('./routes/feedRoutes');

// various requires
const express = require('express');
const path = require('path');

const port = process.env.PORT || 2000;

// express app
const app = express();

//enabled cookie parser
app.use(cookieParser());

// always parses json
app.use(express.json());

// This code allows the express server to communicate with other servers and allows for the use of the cors package to communicate with the front end.
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  exposedHeaders: ['Content-Length', 'X-Powered-By']
}));


// will serve the static assets in build folder in client side, (index.html will be able to use css and bundle.js)
app.use(express.static(path.resolve(__dirname, '../client/build')));

// routes
app.use('/user', userRoutes);

app.use('/feed', feedRoutes);

// on visiting homepage, send index.html file
app.get('/*', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/build/index.html'));
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
