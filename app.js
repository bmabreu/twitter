const express = require('express');
const morgan = require('morgan');
const app = express();
const nunjucks = require('nunjucks');
const tweetBank = require('./tweetBank.js');

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
// in some file that is in the root directory of our application... how about app.js?
var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
//reference index.html for how locals is being interpreted
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

nunjucks.configure('views', {noCache: true});
nunjucks.render('index.html', locals, function (err, output) {
    console.log(output);
});
//configure is one that goes to the folder, and render targets the html file



//path used here is where you get the GET request in your terminal
// app.use(morgan(function(req, res, next) {
//     console.log('GET / ');
//     console.log('GET /is-anybody-in-there');
//     console.log('POST /modernism');
// }));

app.get('/', function(req, res, next) {
    res.render( 'index.html', locals );
    //render takes object and displays on page
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

app.get('/tweets/:id',(req,res,next) => {
    let id = req.params.id;
    let tweetReq = tweetBank.list()[id]
    res.send(tweetReq);

    if (!tweetReq) {
        console.error(err.stack)
        res.status(404).send('Page not found!');
    }
   //how to get id from user input
   //this id can be used for getting infomation from bank
});

app.listen(3000);

//npm i --save-dev morgan would add something as a dev dependency

