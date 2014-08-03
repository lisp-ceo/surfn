#!/usr/bin/env node

var crypto = require( 'crypto' );

var password_string = "p";

var shasum = crypto.createHash( 'sha512' );
shasum.update( password_string );

console.log( 'Hash of password: ' + password_string.toString() + '. Is: ' + shasum.digest( 'hex' ) );
