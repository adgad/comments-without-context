'use strict';

require('isomorphic-fetch');

const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
const comments = require('./lib/comments');
comments.init();




app.get('/', (req, res) => {
	const items = comments.getData();
	res.render('index', items[Math.floor(Math.random()*items.length)]);
});


app.get('/:id', (req, res) => {
	res.set('Cache-Control', 'public, max-age=3600');
	require('./lib/fb').getComment(req.params.id)
	.then(comment => {
		res.render('index', comment);
	})
	
});


app.listen(process.env.PORT || 3000);