'use strict';

require('isomorphic-fetch');

const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const comments = require('./lib/comments');
comments.init();




app.get('/', (req, res) => {
	const items = comments.getData();
	res.render('index', items[Math.floor(Math.random()*items.length)]);
});

app.listen(process.env.PORT || 3000);