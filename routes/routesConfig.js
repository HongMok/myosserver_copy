/**
 * Created by moxiong on 2015/9/9.
 */
var querystring = require("querystring");
var url = require("url");
var DB = require('../db/db');

var routeUser = require('./routeUser');
var routeUserInstance = new routeUser();

var routeArticle = require('./routeArticle');
var routeArticleInstance = new routeArticle();

var routeComment = require('./routeComment');
var routeCommentInstance = new routeComment();

var config = {};

//登陆
config['/loginUser'] = routeUserInstance['loginUser'];

//注册
config['/registerUser'] = routeUserInstance['registerUser'];

//更新
config['/updateUser'] = routeUserInstance['updateUser'];

//发表文章
config['/postArticle'] = routeArticleInstance['postArticle'];

//获取用户文章
config['/getArticlesByUserName'] = routeArticleInstance['getArticlesByUserName'];

//获取全部文章
config['/getArticles'] = routeArticleInstance['getArticles'];

//发表评论
config['/postComment'] = routeCommentInstance['postComment'];

//获取某篇文章的评论
config['/getCommentByArticleId'] = routeCommentInstance['getCommentByArticleId'];

config['/'] = function( req, res ){
    res.setHeader('Content-Type', 'text/html');
    res.end('hello world');
}


module.exports = config;