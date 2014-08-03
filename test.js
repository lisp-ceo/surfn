var app = require( './app' );
var http = require( 'http' );

http.createServer( app ).listen( process.env.port, function(){
  console.log( 'App has resumed on ' + process.env.port + '. In ' + process.env.NODE_ENV + ' mode' );
});
var app = require( './app' );
