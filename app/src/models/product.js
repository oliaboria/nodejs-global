'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    name: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DOUBLE
    },
    reviews: {
      type: Sequelize.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};