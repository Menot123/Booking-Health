'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderUser' })
            // Allcode.hasMany(models.User, { foreignKey: 'position', as: 'positionUser' })

            Allcode.hasMany(models.Doctor_info, { foreignKey: 'priceId', as: 'dataPrice' })
            Allcode.hasMany(models.Doctor_info, { foreignKey: 'provinceId', as: 'dataProvince' })
            // Allcode.hasMany(models.Doctor_info, { foreignKey: 'timeType', as: 'dataTime' })

            Allcode.hasMany(models.User, { foreignKey: 'position', as: 'positionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })

        }
    };
    Allcode.init({
        keyCode: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};