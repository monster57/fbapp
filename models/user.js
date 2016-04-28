"use strict";

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    facebook_id:{
      type: DataTypes.INTEGER,
      field:'facebook_id',
      unique: true
    },
    displayName:{
      type: DataTypes.STRING,
      field:'displayname'
    },
    gender:{
      type:DataTypes.STRING,
      field:'gender'
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
      },
      validPassword: function(password, passwd, done, user){
          bcrypt.compare(password, passwd, function(err, isMatch){
                  if (err) console.log(err)
                  if (isMatch) {
                          return done(null, user)
                  } else {
                          return done(null, false)
                  }
          })
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
