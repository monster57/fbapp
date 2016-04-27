"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name:{
      type: DataTypes.STRING,
      field:'name'
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
      createUser:function(userData){
        return this.Create(userData);
      }
    }
  });

  return User;
};