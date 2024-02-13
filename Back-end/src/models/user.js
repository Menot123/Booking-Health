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

      User.hasOne(models.Doctor_info, { foreignKey: 'doctorId', targetKey: 'doctorId', as: 'dataIdDoctor' })
      User.belongsTo(models.Allcode, { foreignKey: 'position', targetKey: 'keyCode', as: 'positionData' })
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyCode', as: 'genderData' })
      User.hasMany(models.Booking_doctor, { foreignKey: 'patientId', as: 'dataPatient' })

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