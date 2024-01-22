'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyCode', as: 'genderUser' })
      // User.belongsTo(models.Allcode, { foreignKey: 'position', targetKey: 'keyCode', as: 'positionUser' })
      // User.belongsTo(models.Allcode, { foreignKey: 'roleId', targetKey: 'keyCode', as: 'roleUser' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING,
    roleId: DataTypes.STRING,
    position: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};