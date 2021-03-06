/**
 * Created by moxiong on 2015/9/9.
 */

var mongojs = require('mongojs');

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/mydb';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var collections = [ 'users', 'articles', 'comments' ];

function buildDB( ){
    var db = mongojs('mongodb://'+connection_string, collections );
    return db;
}

module.exports = buildDB;