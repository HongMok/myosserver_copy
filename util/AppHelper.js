/**
 * Created by moxiong on 2015/9/10.
 */

function Helper(){

    var self = this;

    self.receiveAllPostData = function( req, callBack ){
        var postData = '';
        req.on('data', function( chunk ){
            postData += chunk;
        });
        req.on('end', function(){
            callBack( postData );
        });
    };
};

module.exports = new Helper();