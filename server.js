const express = require('express')
const cors = require('cors')
const app = express();
const request = require('request');

app.use(cors());

const serverURL = 'https://fullstack-challenge-api.herokuapp.com';

app.get('/devices', fetchDataFromServer);
app.get('/devices/:id', fetchDataFromServer);
app.get('/devices/:id/readings', fetchDataFromServer);

function fetchDataFromServer(req, res, next) {
  const routeWithParams = replaceParamsInRoute(req.route.path, req.params);
  request(serverURL+routeWithParams, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.setHeader('Content-Type', 'application/json');
      res.json(JSON.parse(body));
    }
    else {
      console.log(error);
    }
  })
}

function replaceParamsInRoute(route, params) {
  let routeWithParams = route;
  const keys = Object.keys(params);
  keys.map((key) => {
    routeWithParams = route.replace(new RegExp(':' +key, 'g'), params[key]);
  });
  return routeWithParams;
}

app.listen(8080, function(){
  console.log('CORS-enabled web server listening on port 8080');
});
