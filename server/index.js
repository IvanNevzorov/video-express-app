const path = require('path');
let env = process.env.NODE_ENV || 'development';
const envPath = path.join(__dirname, '..');
require('dotenv').config({ path: `${envPath}/.env.${env}` });
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // create express app
app.use(cors());
app.use(bodyParser.json());


if (env === 'production') {
  console.log('Setting Up express.static for prod');
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}


const serverPort = process.env.SERVER_PORT || process.env.PORT || 5000;
// start express server on port 5000
app.listen(serverPort, () => {
  console.log('server started on port', serverPort);
});
