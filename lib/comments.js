'use strict';

let data = [];
const accounts = process.env.ACCOUNTS ? process.env.ACCOUNTS.split(',') : ['bbcnews', 'theguardian','DailyMail','thesun', 'LADbible', 'DailyExpress', 'skynews'];
const fb = require('./fb');

function pollData() {
	const promises = accounts.map(acc => fb.getComments(acc));
	Promise.all(promises)
	.then(res => {
		console.log('Got all the data');
		data = [];
		res.forEach(publisher => {
			publisher.data.forEach(article => {
				if(!article.comments) return; 
				article.comments.data.forEach((comment) => {
					if(comment.message.split(' ').length < 10) return;
					if(comment.message.indexOf('http:') >= 0) return;
					if(comment.message.indexOf('2348060420085') >= 0) return;
					data.push(comment);
				});
			})
		});

	});
}

exports.init = () => {
	pollData();
	setInterval(pollData, 1000 * 60 * 5);
}
exports.getData = () => data;