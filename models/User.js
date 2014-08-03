var sqlite3 = require( 'sqlite3' );
var utils = require( '../utils' );
var Backbone = require( 'backbone' );

var User = Backbone.Model.extend({

  defaults: {
    user_id: undefined,
    email: undefined,
    twitter_handle: undefined,
    salt_password: undefined,
    password: undefined,
    name: undefined,
    gender_id: undefined,
    role_id: undefined
  },

  find_by_email: function( next ){

    if( utils._.isUndefined( this.get( 'email' ) ) ){
      next( { msg: 'No email' }, undefined );
    }
    else {

      var db = new sqlite3.Database( utils.path.join( __dirname, '..', process.env.DB_FILEPATH, process.env.DB_FILENAME ));
  
      db.all( 'SELECT * from users WHERE email = $email', {
        $email: this.get( 'email' )
      }, function( err, row ){
        next( err , new User( utils._.first( row ) ) );
      });

      db.close();

    }
  
  },

  find_by_id: function( next ){

    if( utils._.isUndefined( this.get( 'user_id' ) ) ){

      next( { msg: 'No user id provided' }, undefined );

    }
    else {

      var db = new sqlite3.Database( utils.path.join( __dirname, '..', process.env.DB_FILEPATH, process.env.DB_FILENAME ));

      db.all( 'SELECT * from users WHERE user_id = $id', { 
        $id: this.get( 'user_id' )
      }, function( err, row ){
        next( err, new User( utils._.first( row ) ) );
      });

      db.close();
    }

  },

  is_valid_password_sync: function( password_attempt ){

    var crypto = require( 'crypto' );
    var shasum = crypto.createHash( 'sha512' );
    var salted_password;
    var status = false;

    if( !utils._.isUndefined( password_attempt ) && !utils._.isUndefined( this.get( 'salt_password' ) ) ){

      shasum.update( password_attempt );
      salted_password = shasum.digest( 'hex' );
      status = ( salted_password === this.get( 'salt_password' ) );

    }

    return status;

  }

});

module.exports = User;
