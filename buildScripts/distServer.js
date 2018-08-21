import express from 'express';
import path from 'path';
import opn from 'opn';
import compression from 'compression';

/*eslint-disable no-console */

var dotenv= require('dotenv');
dotenv.load({ path: '.env' });
const port =process.env.PORT || 3000;
const app = express();

app.use(express.static('dist'));
app.use(compression());

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    opn(`http://localhost:${port}`);
  }
});
