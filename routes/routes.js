const express = require('express');
// const sequelize = require('sequelize');
// const pg = require('pg');
// const pgHstore = require('pg-hstore');
 
const router = express.Router();

router.get('/', function(req, res, next){
	res.send('home page');
});


module.exports = router;