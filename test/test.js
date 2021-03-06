/**
 * Created by moxiong on 2015/9/10.
 */
var querystring = require('querystring');
var http = require('http');
var appHelper = require('../util/AppHelper');

var postData = JSON.stringify({
    'userName' : 'mok',
    'passWord' : '123',
    'pageSize' : 2,
    'pageIndex' : 0
});

var options = {
    hostname: '127.0.0.1',
    port: 8088,
    path: '/getArticlesByUserName',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');

    appHelper.receiveAllPostData( res, function( postData ){
        console.log( postData );
    } );
    //res.on('data', function (chunk) {
    //    console.log('BODY: ' + chunk);
    //});
    //res.on('end', function() {
    //    console.log('No more data in response.')
    //})
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData + '\n');
req.end();

