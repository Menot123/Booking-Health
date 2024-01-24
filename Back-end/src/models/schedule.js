'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {

        static associate(models) {
            Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyCode', as: 'dataTime' })

        }
    };
    Schedule.init({
        doctorId: DataTypes.INTEGER,
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};