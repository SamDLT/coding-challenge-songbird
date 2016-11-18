const express = require('express')
const cors = require('cors')
const app = express();
const request = require('request');

app.use(cors());

const serverURL = 'https://fullstack-challenge-api.herokuapp.com';

app.get('/devices', (req, res, next) => {
  request(serverURL+'/devices', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.setHeader('Content-Type', 'application/json');
      res.json(JSON.parse(body));
    }
    else {
      console.log(error);
    }
  })
});

app.listen(8080, function(){
  console.log('CORS-enabled web server listening on port 8080');
});
