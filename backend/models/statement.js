'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statement extends Model {
    
    static associate(models) {
      Statement.belongsTo(models.Company, {
        foreignKey: 'companyId',
        onDelete: 'CASCADE', 
      });
    }
  }
  Statement.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skills: {
      type: DataTypes.STRING(500),
    },
    salary: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    jobType: {
      type: DataTypes.STRING
    },
    experience: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'Company', 
        key:'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Statement',
  });
  return Statement;
};
