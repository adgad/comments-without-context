'use strict';

let data = [];
const accounts = process.env.ACCOUNTS ? process.env.ACCOUNTS.split(',') : ['bbcnews', 'theguardian','DailyMail','thesun', 'LADbible', 'DailyExpress', 'skynews'];
const fb = require('./fb');

function pollData() {
	const promises = accounts.map(acc => fb.getComments(acc));
	Promise.all(promises)
	.then(res => {
		data = [];
		res.forEach(publisher => {
			publisher.data.forEach(article => {
				article.comments.data.slice(0, 10).forEach((comment) => {
					if(comment.message.split(' ').length < 10) return;
					data.push({
						comment: comment.message,
						user: comment.from,
						post: article.message,
						postId: article.id
					});
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