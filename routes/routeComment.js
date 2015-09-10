/**
 * Created by moxiong on 2015/9/9.
 */
var url = require('url');
var DB = require('../db/db');
var appHelper = require('../util/AppHelper');

var routeComment = function(){

    var self = this;
    self.db = new DB();

    self.postComment = function( req, res ){
        appHelper.receiveAllPostData( req, function( postData ) {
            var params = JSON.parse(postData);
            var userName = params['userName'];
            var articleId = params['articleId'];
            var content = params['content'];

            var comment = {};
            comment['articleId'] = articleId;
            comment['userName'] = userName;
            comment['content'] = content;

            var json = {};
            self.db['comments'].save( comment, function( err, saved ){
                if( err || ! saved ){
                    json['res'] = -1;    //发表不成功
                }
                else{
                    json['res'] = 1;
                    json['comment'] = saved;
                }
                res.end( JSON.stringify(json) );
            } );
        });

    };

    self.getCommentByArticleId = function( req, res ){
        appHelper.receiveAllPostData( req, function( postData ) {
            var params = JSON.parse(postData);
            var articleId = params['articleId'];

            var json = {};
            self.db['comments'].find( {'articleId' : articleId }, function( err, comments ){
                if( err || ! comments ){
                    json['res'] = -1;
                }
                else{
                    json['res'] = 1;
                    json['comments'] = comments;
                }
                res.end( JSON.stringify(json) );
            }  );
        });

    };
};

module.exports = routeComment;