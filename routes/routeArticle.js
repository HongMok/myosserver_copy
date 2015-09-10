/**
 * Created by moxiong on 2015/9/9.
 */

var url = require('url');
var DB = require('../db/db');
var appHelper = require('../util/AppHelper');

var routeArticle = function(){

    var self = this;
    self.db = new DB();

    self.postArticle = function( req, res ){
        appHelper.receiveAllPostData( req, function( postData ) {
            var params = JSON.parse(postData);
            var userName = params['userName'];
            var content = params['content'];

            var article = {};
            article['userName'] = userName;
            article['content'] = content;
            article['postTime'] = new Date();

            var json = {};
            self.db['articles'].save( article, function( err, saved ){
                if( err || ! saved ){
                    json['res'] = -1;    //发表不成功
                }
                else{
                    json['res'] = 1;
                    json['article'] = saved;
                }
                res.end( JSON.stringify(json) );
            } );
        });

    };

    self.getArticlesByUserName = function( req, res ){
        appHelper.receiveAllPostData( req, function( postData ) {
            var params = JSON.parse(postData);
            var userName = params['userName'];
            var pageSize = params['pageSize'];
            var pageIndex = params['pageIndex'];

            var json = {};
            self.db['articles'].find( {'userName' : userName } )
                .sort({'postTime' : -1})
                .limit( pageSize)
                .skip( pageIndex * pageSize, function( err, articles ){
                    if( err || ! articles ){
                        json['res'] = -1;
                    }
                    else{
                        json['res'] = 1;
                        json['articles'] = articles;
                    }
                    res.end( JSON.stringify(json) );
                }  );
        });

    };

    self.getArticles = function( req, res ){
        appHelper.receiveAllPostData( req, function( postData ) {
            var params = JSON.parse(postData);
            var pageSize = params['pageSize'];
            var pageIndex = params['pageIndex'];

            var json = {};
            self.db['articles'].find( { } )
                .sort({'postTime' : -1})
                .limit( pageSize)
                .skip( pageIndex * pageSize, function( err, articles ){
                    if( err || ! articles ){
                        json['res'] = -1;
                    }
                    else{
                        json['res'] = 1;
                        json['articles'] = articles;
                    }
                    res.end( JSON.stringify(json) );
                } );
        });

    };
};

module.exports = routeArticle;