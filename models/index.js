var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
		title: {
			type: Sequelize.STRING, 
			allowNull: false
		},
		urlTitle: {
			type: Sequelize.STRING, 
			allowNull: false, 
			// validate: {isUrl: true},
		},
		content: {
			type: Sequelize.TEXT, 
			allowNull: false
		},
		status: {
			type: Sequelize.ENUM('open', 'closed'),
			allowNull: true
		},
		date: {
			type: Sequelize.DATE, 
			defaultValue: Sequelize.NOW
		}
	},{

		hooks: {
				beforeValidate: function makeUrl(page){
				if (page.title){
					page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
					console.log("OUR URL TITLE" +page.urlTitle);
				}
				else{
					page.title = Math.random().toString(36).substring(2, 7);
					page.urlTitle = page.title;
				}
				}
		},
		getterMethods: {
			route: function() {
				return '/wiki/' + this.urlTitle;
				}
			}
	}
);

var User = db.define('user', {
	name: {
		type: Sequelize.STRING, 
		allowNull: false
	},
	email: {
		type: Sequelize.STRING, 
		allowNull: false, 
		validate: {isEmail: true}
	}
});

Page.belongsTo(User, { as: 'author' });
// this makes a bunch of methods on the Page object that allows us to make associates 
// between the page and the user

module.exports = {
  Page: Page,
  User: User
};

//