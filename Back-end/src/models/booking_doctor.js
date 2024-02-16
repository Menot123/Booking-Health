'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking_doctor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Booking_doctor.belongsTo(models.User, { foreignKey: 'patientId', targetKey: 'id', as: 'dataPatient' })
            Booking_doctor.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyCode', as: 'dataTime' })

        }
    };
    Booking_doctor.init({
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        verify: DataTypes.STRING,
        numberPatient: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Booking_doctor',
    });
    return Booking_doctor;
};