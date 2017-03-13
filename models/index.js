var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
	title: Sequelize.STRING,
	urlTitle: Sequelize.STRING,
	content: Sequelize.TEXT,
	type: Sequelize.ENUM('open', 'closed')
});

var User = db.define('user', {
	name: Sequelize.STRING,
	email: Sequelize.STRING
});

module.exports = {
  Page: Page,
  User: User
};