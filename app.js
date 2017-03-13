'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const fs = require('fs');
// const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
// ...

//rendering 
const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


//synching to db
models.User.sync({force: true})
.then(function () {
    return models.Page.sync({force: true})
})
.then(function () {
    app.listen(3000, function () {
        console.log('\nSERVER IS LISTENING IN 3000!\n');
    });
})
.catch(console.error);

app.use(express.static('public'));

app.use('/', routes);
app.use('/wiki', wikiRouter);

