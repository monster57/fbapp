"use strict";

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name:{
      type: DataTypes.STRING,
      field:'name'
    },
    email:{
      type: DataTypes.STRING,
      field:'email',
      unique: true
    },
    password:{
      type:DataTypes.STRING,
      field:'password'
    },
    role:{
      type:DataTypes.STRING,
      field:'role',
      defaultValue:'user'
    },
    profileimage:{
      type:DataTypes.STRING,
      field:'profileimage'
    }
  },{
    tableName: 'users',
    classMethods:{
      createHash: function(password){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
      }
    },
    instanceMethods: {
      authenticateUser: function(plainPassword) {
        return this.password === User.createHash(plainPassword);
      }
    }
  });

  return User;
};
