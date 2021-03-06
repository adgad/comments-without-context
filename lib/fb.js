'use strict';

const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;

exports.getComments = function(account) {
	return fetch(`https://graph.facebook.com/${account}/posts?limt=50&fields=message,comments&access_token=${APP_ID}|${APP_SECRET}`)
	.then(resp => resp.json())
};

exports.getComment = function(commentId) {
	return fetch(`https://graph.facebook.com/${commentId}?access_token=${APP_ID}|${APP_SECRET}`)
	.then(resp => resp.json())
}