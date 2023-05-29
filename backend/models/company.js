'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.Statement, {
        foreignKey: 'companyId',
        onDelete: 'CASCADE',
      });
    }
  }
  Company.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    role:{ 
      type: DataTypes.STRING,
      defaultValue: "company"
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};