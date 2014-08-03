define([ "jquery", "underscore"], function( $, _ ){

  var app = {
    start: function(){
      $(function(){
        alert( 'start surfin, brah' );
      });
    }
  }
  
  return app;

});
