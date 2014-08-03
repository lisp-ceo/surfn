var user = require( './handlers/user' );

module.exports = function( app, passport ){

  app.post( '/login', passport.authenticate( 'local' ), user.login );
  app.get( '/logout', user.logout );
  app.get( '/profile', user.ensure_authenticated, user.profile );

}
