requirejs.config({
  baseUrl: "js",
  paths: {
    underscore: "lib/underscore",
    text: "lib/text",
    tpl: "lib/underscore-tpl",
    jquery: "lib/jquery"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    tpl: [ "text" ]
  }

});

require([ "bin/app" ], function( surfn ){
  surfn.start();
});
