const express = require('express');
const sequelize = require('sequelize');
// const pg = require('pg');
// const pgHstore = require('pg-hstore');
const bodyParser = require('body-parser'); 
const wikiRouter = express.Router();
const models = require("../models");
const Page = models.Page;
const User = models.User;

wikiRouter.use(bodyParser.json());
wikiRouter.use(bodyParser.urlencoded({ extended: true }));



wikiRouter.get('/', function(req, res, next){
	// res.redirect('/');
	// var output = [];
	Page.findAll({
		attributes: ['urlTitle']
	})
	.then(function(all){
		return all.map(function(elem){
			return elem.urlTitle;
		})
	})
	// .then(console.log(output))
	.then(function(output){
		res.render('index', {pages: output});
	});

});

wikiRouter.get('/users', function(req, res, next){
	User.findAll({
		attributes: ['name']
	})
	.then(function(all){
		return all.map(function(elem){
			return elem.name;
		})
	})
	.then(function(output){
		res.render('users', {users: output});
	})
})

wikiRouter.get('/users/:id', function(req, res, next){
	var id = req.params.id;
	Page.findAll({
		// attributes: ['title']
		where: sequelize.where(sequelize.col('authorId'),id)		
	})
	.then(function(){
		console.log(all);
	})
})

wikiRouter.post('/', function(req, res, next){
	// res.json(req.body)
	console.log(req.body);

	User.findOrCreate({
		where: {
			name: req.body.name,
			email: req.body.email
		}
	})
	.then(function(values){
		console.log(values);
		var user = values[0];
		var page = Page.build({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status,
			date: Date.now(),
		});
		return page.save()
		.then(function(page){
			return page.setAuthor(user);
			// page.setAuthor sets the authorId to match the id of the author 
			// in the other day. It's like page.Update(authorId)
		})
	})
	.then(function(page){
		res.redirect(page.route);
	})
	.catch(next);

	// var page = Page.build(
	// 	{
	// 		title: req.body.title,
	// 		content: req.body.content,
	// 		status: req.body.status,
	// 		author: req.body.name,
	// 		date: Date.now(),
	// 		email: req.body.email
	// 	}
	// );
	// var user = User.build(
	// 	{ 
	// 		name: req.body.name,
	// 		email: req.body.email
	// 	}
	// );

	// user.save();

	// page.save()
	// .then(function(savedPage){
	// 	console.log(savedPage);
	// 	res.redirect(savedPage.route);
	// }).catch(next);

})

wikiRouter.get('/add', function(req, res, next){
	res.render('addpage');
})

wikiRouter.get('/:page', function(req, res, next){
	var page = req.params.page;
	// res.send(page);
	Page.findAll({
		where: sequelize.where(sequelize.col('urlTitle'),page)		
	})
	.then(function(result, something){
		// console.log(Object.keys(result[0].dataValues));
		res.render('wikipage', {
			title: result[0].dataValues.title,
			author: result[0].dataValues.name,
			content: result[0].dataValues.content
		});
	});


	// Page.findAll({
 //  		where: sequelize.where(sequelize.col('urlTitle'), page)
	// }).then(function(foundPage){
	// 	res.json(foundPage);
	// });

	// (result,something){
	// 	console.log(something);
	// 	console.log(result);
	// 	res.render("wikipage",{title: result.title, content: result.content})
	// })
});

module.exports = wikiRouter;