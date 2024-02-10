'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Clinic.hasMany(models.Doctor_info, { foreignKey: 'clinicId', as: 'dataClinic' })

        }
    };
    Clinic.init({
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,
        addressVi: DataTypes.STRING,
        addressEn: DataTypes.STRING,
        status: DataTypes.STRING,
        descriptionVi: DataTypes.TEXT('long'),
        descriptionEn: DataTypes.TEXT('long'),
        markdownVi: DataTypes.TEXT('long'),
        markdownEn: DataTypes.TEXT('long'),
        image: DataTypes.BLOB('long'),
    }, {
        sequelize,
        modelName: 'Clinic',
    });
    return Clinic;
};