/* globals describe, it */

var config = require('../config');
var homeLib = require( '../lib/home_controller_lib' );
var assert = require( 'assert' );
require( 'simple-mocha' );
describe( 'API', function() {

  it( ' should have userRole parameter ', function( done ) {

    homeLib.getAllUsers({
      userRole: 'user'
    }).then(function(users) {
        console.log('Done',users);
        assert( users.length, 0, 'No Users found with user role' );
        done();
      })
      .catch( done );
  });
});


