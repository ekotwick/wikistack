'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const fs = require('fs');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const models = require('./models');

//rendering 
const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


//synching to db
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('\nSERVER IS LISTENING IN 3000!\n');
    });
})
.catch(console.error);

app.use(express.static('public'));

app.use('/', routes);

