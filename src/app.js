const request  = require('postman-request');
const express  = require('express');
const server = express();
const path = require('path');
const port = 3000;
var hbs = require('hbs');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// console.log(partialsPath);
server.set('view engine', 'hbs');
server.set('views', viewsPath);
hbs.registerPartials(partialsPath);
server.get('/',(req, res) => {
    res.render('home');
});

server.get('/home',(req, res) => {
    res.render('home');
});

server.get('/about',(req, res) => {
    res.render('about');
});

const url = "https://api.openweathermap.org/data/2.5/weather?q=hebron&appid=cad86314552b94deb5b82fa8e5e1e33e";
server.get('/weather',(req, res) => {
    request(url, function (error, response, body) {
       let weather = JSON.parse(body);
       let name = weather.name;
       let temp = weather.main.temp;
       let des = weather.weather[0].description;
       let obj = {
           name : name,
           temp: (temp-273).toFixed(2),
           des: des
       }
        res.render('weather',obj);
    });
});

server.listen(port, () => {
  console.log('every thing is OK !');
});
