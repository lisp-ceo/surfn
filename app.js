// Core
var express = require( 'express' );
var app = module.exports = express();
var config = require( './config.json' )[ process.env.NODE_ENV || 'development' ];
var utils = require( './utils' );

// Express deps

set_environment_varibles( config );
configure_db();
configure_express();

function set_environment_varibles( config ){

  utils._.forOwn( config, function( val, key ){
    process.env[key] = val;
  });

}
function configure_db(){

  var sqlite;
  var db;
  var db_exists;

  console.log( process.argv.toString() );

  if( utils._.contains( process.argv, '--db' )){

    db_exists = utils.fs.existsSync( utils.path.join( __dirname, process.env.DB_FILEPATH, process.env.DB_FILENAME ) ); 

    if( db_exists ){
      console.log( 'Deleting legacy database' );
      utils.fs.unlinkSync( utils.path.join( __dirname, process.env.DB_FILEPATH, process.env.DB_FILENAME ) );
    }

    console.log( 'Initializing new database' );
    sqlite3 = require( 'sqlite3' ).verbose();
    db = new sqlite3.Database( utils.path.join( __dirname, process.env.DB_FILEPATH, process.env.DB_FILENAME ) );

    utils.fs.readFile( utils.path.join( __dirname, process.env.DB_FILEPATH, 'seed.sql' ), function( err, data ){

      var query = data.toString( 'utf-8' );
      var queries = query.split( ';' );

      if( err ){
        throw 'Couldn\'t read SQL file at';
      }
      else {
        db.serialize( function(){
          queries.forEach( function( query_string ){
            query_string = query_string.replace( '\r\n', '' );
            query_string += ';';
            db.run( query_string, function( err ){
              if( err ){
                throw 'Seed query error: ' + err;
              }
            });
          });
        });
      }
    });

  }

}
function configure_express(){

  var routes = require( './routes' );
  var passport = require( 'passport' );
  var LocalStrategy = require( 'passport-local' ).Strategy;
  var morgan = require( 'morgan' );
  var User = require( './models/User' );
  var cookie_parser = require( 'cookie-parser' );
  var body_parser = require( 'body-parser' );
  var session = require( 'express-session' );

  // By-envrionment
    // Server config
    // Logging
    // Sessions
    // OAuth handlers

  if( process.env.NODE_ENV === 'development' ){

    // Server config
    app.use( express.static( './public' ) );
    app.use( cookie_parser() );
    app.use( body_parser.urlencoded({ extended: true }) );
    app.use( body_parser.json() );

    // Logging
    app.use( morgan( 'combined', {
      stream: utils.fs.createWriteStream( 'app.log', { 'flags' : 'w' } )
    }));

    // Sessions
    app.use( session({
      cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // A week
      secret: process.env.session_secret,
      resave: true,
      saveUninitialized: true
    }));

    // Oauth
    passport.serializeUser( function( user, next ){
      next( null, user.get( 'user_id' ) );
    });
    passport.deserializeUser( function( id, next ){
      var User = require( './models/User' );
      var _user = new User({
        user_id: id
      });
      _user.find_by_id( function( err, user ){
        next( err, user );
      });
    });
    passport.use( new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function( email, password, done ){

      var User = require( './models/User' );
      var _user = new User({
        email: email,
        password: password
      });
      _user.find_by_email( function( err, user ){

        if( err ){
          return done( err );
        }

        if( !user ){
          return done( null, false, { message: 'Incorrect username' });
        }

        if( !user.is_valid_password_sync( password ) ){
          return done( null, false, { message: 'Incorrect password' });
        }

        return done( null, user );

      });

    }));

    app.use( passport.initialize() );
    app.use( passport.session() );

  }
  else if( process.env.NODE_ENV === 'production' ){
    throw 'Production config not spec\'d';
  }
  else {
    throw 'Unhandled Environment';
  }

  routes( app, passport );

}
