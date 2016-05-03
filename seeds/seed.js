var seeder = require('mongoose-seed');
var fs = require('fs');
// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost/nodeauth', function() {
	
	// Load Mongoose models 
	seeder.loadModels([
		'./models/user.js',
		'./models/project.js'
	]);
 
	// Clear specified collections 
	seeder.clearModels(['User'], function() {
 
		// Callback to populate DB once collections have been cleared 
		seeder.populateModels(data);
 
	});
});

// Path for reading file
var usersFile = 'users.json';
var content = fs.readFileSync(__dirname+"/users.json" , 'utf8');
var val = JSON.parse(content);

// Data array containing seed data - documents organized by Model 
var data = [
	{ 
		'model': 'User',
		'documents': val
				
	}
];	