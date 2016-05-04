/* globals describe, it */

var config = require('../config');
var homeLib = require( '../lib/home_controller_lib' );
var assert = require( 'assert' );
require( 'simple-mocha' );
describe( 'API', function() {

  it.skip( ' should have userRole parameter ', function( done ) {

    homeLib.getAllUsers({
      userRole: 'user'
    }).then(function(users) {
        console.log('Done',users);
        assert( users.length, 0, 'No Users found with user role' );
        done();
      })
      .catch( done );
  });

  it.skip( ' should have facebook_id and other stuffs parameter ', function( done ) {

    homeLib.changeAccess({
      data: [{
				"facebook_id": "509530525860555",
				"role":"admin"
			}, {
				"facebook_id": "10209697590941998",
				"role":"admin"
			}, {
			    "facebook_id":"1169796913065087",
			    "role":"user"
			    }]
    })
    .then(function(data){
    	console.log("data:::_---- ",data);
    	assert( true );
    	done();
    })
    .catch();
  });

	it.skip( ' should have user id parameter ', function( done ) {

	    homeLib.getAllProjects('572895e3eea546eb7e93e555')
	    .then(function(projects) {
	        assert( true );
	        done();
	      })
	      .catch( done );
	  });


	it.skip( ' should have user id and image data for saving project ', function( done ) {

		    homeLib.saveProject({
		    	_id: '572895e3eea546eb7e93e555',
		    	title: 'test case testing',
		    	image_data: [{
		    		"fieldname": "cover_image",
		    		"filename": "test case"
		    	}]
		    })
		    .then(function(projects) {
		        assert( projects, 'Not saved' );
		        done();
		      })
		      .catch( done );
	});

	it.skip( ' should have project id parameter ', function( done ) {

		    homeLib.showProject('5729a8a9e92aa0cd1982fcdb')
		    .then(function(projects) {
		        assert( projects, 'Not Projects Found' );
		        done();
		      })
		      .catch( done );
	});

	it( ' should have project id parameter for deleting the project ', function( done ) {

		    homeLib.deleteProject('5729a8a9e92aa0cd1982fcdb')
		    .then(function(projects) {
		        assert( projects, 'Not Projects Found' );
		        done();
		      })
		      .catch( done );
	});

});


