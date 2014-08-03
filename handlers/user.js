module.exports = {
  ensure_authenticated: function( req, res, next ){
    if( req.isAuthenticated() ){
      next();
    }
    else {
      res.writeHead( 401, 'User not signed in' );
      res.end();
    }
  },
  login: function( req, res ){ 
    res.redirect( '/profile' ); 
  },
  logout: function( req, res ){

    req.session.destroy();
    res.redirect( '/' );
  
  },
  profile: function( req, res ){

    res.json({
      session: JSON.stringify( req.session )
    });
  
  }
}

