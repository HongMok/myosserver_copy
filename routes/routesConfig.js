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

//��½
config['/loginUser'] = routeUserInstance['loginUser'];

//ע��
config['/registerUser'] = routeUserInstance['registerUser'];

//����
config['/updateUser'] = routeUserInstance['updateUser'];

//��������
config['/postArticle'] = routeArticleInstance['postArticle'];

//��ȡ�û�����
config['/getArticlesByUserName'] = routeArticleInstance['getArticlesByUserName'];

//��ȡȫ������
config['/getArticles'] = routeArticleInstance['getArticles'];

//��������
config['/postComment'] = routeCommentInstance['postComment'];

//��ȡĳƪ���µ�����
config['/getCommentByArticleId'] = routeCommentInstance['getCommentByArticleId'];

config['/'] = function( req, res ){
    res.setHeader('Content-Type', 'text/html');
    res.end('hello world');
}


module.exports = config;