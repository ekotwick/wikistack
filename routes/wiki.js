const express = require('express');
const sequelize = require('sequelize');
// const pg = require('pg');
// const pgHstore = require('pg-hstore');
const bodyParser = require('body-parser'); 
const wikiRouter = express.Router();
const models = require("../models");
const Page = models.Page;


wikiRouter.use(bodyParser.json());
wikiRouter.use(bodyParser.urlencoded({ extended: true }));



wikiRouter.get('/', function(req, res, next){
	res.redirect('/');
});

wikiRouter.post('/', function(req, res, next){
	// res.json(req.body)
	console.log(req.body);
	var page = Page.build({title: req.body.title , content: req.body.content, status: req.body.status, date: Date.now()});
	page.save().then(res.redirect("/"));
})

wikiRouter.get('/add', function(req, res, next){
	res.render('addpage');
})

wikiRouter.get('/:page', function(req, res, next){
	var page = req.params.page;
	// res.send(page);
	Page.findAll({
  		where: sequelize.where(sequelize.col('urlTitle'), page)
	}).then(function(result,something){res.render("wikipage",{title:result.title})})
});

module.exports = wikiRouter;