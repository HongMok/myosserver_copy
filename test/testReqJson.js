/**
 * Created by moxiong on 2015/9/10.
 */
request = require('request-json');
var client = request.newClient('http://127.0.0.1:8080/');

var data = {data:{channel : "aaa",appkey : "bbb"},sign : "4444",token : "555"};
client.post('Config', {}, function(err, res, body) {
    console.log( err );
    console.log('res: ' + res );
    console.log('res code: ' + res.statusCode );
    console.log(res.statusCode,body);
});