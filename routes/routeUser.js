/**
 * Created by moxiong on 2015/9/9.
 */

var url = require("url");
var DB = require('../db/db');
var appHelper = require('../util/AppHelper');


var routeUser = function(){
    var self = this;
    self.db = new DB();

    //��½
    self.loginUser = function( req, res ){
        appHelper.receiveAllPostData( req, function( postData ){
            var params = JSON.parse( postData );
            var userName = params['userName'];
            var passWord = params['passWord'];
            var json = {};
            self.db['users'].find( { 'userName' : userName, 'passWord' : passWord }, function( err, docs ){
                if( err || docs.length == 0 ){
                    json['res'] = -1;
                }
                else{
                    json['res'] = 1;
                    json['user'] = docs[0];
                }
                res.end( JSON.stringify(json) );
            });
        });
    };

    //ע��
    self.registerUser = function( req, res ){
        appHelper.receiveAllPostData( req, function( postData ){
            var params = JSON.parse( postData );

            var user = {};
            user['userName'] = params['userName'];
            user['passWord'] = params['passWord'];

            var json = {};
            self.db['users'].find( { 'userName' : user['userName'] }, function( err, docs ){
                if( err || docs.length > 0 ){
                    //�Ѿ�������ͬ���û�
                    json['res'] = -1;
                    res.end( JSON.stringify(json) );
                }
                else{
                    db['users'].save( user, function( err, saved ){
                        if( err || !saved ){
                            json['res'] = -2;   //���治�ɹ�
                        }
                        else{
                            json['res'] = 1;
                            json['user'] = saved;
                        }
                        res.end( JSON.stringify(json) );
                    } );
                }
            } );
        });
    };

    //����
    self.updateUser = function( req, res ){
        appHelper.receiveAllPostData( req, function( postData ) {
            var params = JSON.parse(postData);

            var user = {};
            user['userName'] = params['userName'];
            user['passWord'] = params['passWord'];

            var json = {};
            self.db['users'].find( { 'userName' : user['userName'] }, function( err, docs ){
                if( err || docs.length == 0 ){
                    //�����ڸ��û�
                    json['res'] = -1;
                    res.end( JSON.stringify(json) );
                }
                else{
                    db['users'].update( {'userName': user.userName}, user, function( err, updated ){
                        if( err || !updated ){
                            json['res'] = -2;   //���治�ɹ�
                        }
                        else{
                            json['res'] = 1;
                            json['user'] = updated;
                        }
                        res.end( JSON.stringify(json) );
                    } );
                }
            } );
        });

    };
};



module.exports = routeUser;
