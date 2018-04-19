const express = require('express');
const morgan = require('morgan');
const app = express();

//path used here is where you get the GET request in your terminal
app.use(morgan(function(req, res, next) {
    console.log('GET / ');
    console.log('GET /is-anybody-in-there');
    console.log('POST /modernism');
}));

app.get('/', function(req, res, next) {
    res.send('hello!');
    next();
});

// app.get('/is-anybody-in-there', function(req, res, next) {
//     res.send('is anybody here?');
//     next(); //if you dont add next your page will fall into a black hole
// })

app.get('/bye', function(req, res, next) {
    res.send('bye!');
    next();
});



app.listen(3000);

//npm i --save-dev morgan would add something as a dev dependency