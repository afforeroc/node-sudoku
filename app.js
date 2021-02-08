// Libraries
'use strict';
const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express(); // Init app
app.set('view engine', 'ejs'); // EJS
app.use(express.static(__dirname + '/public')); // Public folder

app.get('/', (req, res) => res.render('index'));

//POST
app.post('/', (req, res) => {
    if (err) {
        res.render('index', {
            msg: err
        });
    } else {
        res.render('index', {
            msg: "all is fine"
        });
    }

});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`* Server start on port: ${port}`));