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
			validate: {isUrl: true},
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
					page.urlTitle = "http://"+page.title.replace(/\s+/g, '_').replace(/\W/g, '')+".com";
					console.log("!!!!!!!!!!!!!!"+page.urlTitle);
				}
				else{
					page.title = Math.random().toString(36).substring(2, 7);
					page.urlTitle = page.title;
				}
				}
		}
	},
	{
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

module.exports = {
  Page: Page,
  User: User
};

//