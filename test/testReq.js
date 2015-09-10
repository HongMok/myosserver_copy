/**
 * Created by moxiong on 2015/9/10.
 */
var request=require('request');

var postData = {
    'userName' : 'Mok',
    'passWord' : '123'
};

var options = {
    headers: {"Connection": "close"},
    url: 'http://127.0.0.1:8080/',
    method: 'POST',
    json:true,
    body: {data: postData,sign : "ccc",token : "ddd"}
};

function callback(error, response, data) {
    console.log('res====');
    console.log('res code: ' + response.statusCode );
    if (!error && response.statusCode == 200) {
        console.log('----info------',data);
    }
}

request(options, callback);