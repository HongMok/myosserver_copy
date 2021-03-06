#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
//var mongojs = require('mongojs');

//var MongoClient = require('mongodb').MongoClient;
var routesConfig = require('./routes/routesConfig');

// default to a 'localhost' configuration:
//var connection_string = '127.0.0.1:27017/mydb';
// if OPENSHIFT env variables are present, use the available connection info:
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
//  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//  process.env.OPENSHIFT_APP_NAME;
//}


/**
 *  Define the sample application.
 */
var App = function() {

    //  Scope.
    var self = this;


    self.setupVariables = function() {
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8088;

        if (typeof self.ipaddress === "undefined") {
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    //self.populateCache = function() {
    //    if (typeof self.zcache === "undefined") {
    //        self.zcache = { 'index.html': '' };
    //    }
    //
    //    self.zcache['index.html'] = fs.readFileSync('./index.html');
    //};


    //self.cache_get = function(key) { return self.zcache[key]; };


    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        //self.routes = { };

        self.routes = routesConfig;

        //self.routes['/testmongojs'] = function(req, res) {
        //    var db = mongojs('mongodb://'+connection_string, ['prices']);
        //    db.prices.find({}, function(err, docs){
        //        if(err){
        //            console.error(err);
        //        }
        //        else{
        //            console.log(docs);
        //            docs.forEach( function(entry){
        //                res.write( '\n name:'  + entry.name );
        //            } );
        //
        //            res.end();
        //        }
        //    });
        //};
        //
        //self.routes['/'] = function(req, res) {
        //    res.setHeader('Content-Type', 'text/html');
        //    res.end("helloworld");
        //};
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express();//.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.post(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        //self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new App();
zapp.initialize();
zapp.start();

