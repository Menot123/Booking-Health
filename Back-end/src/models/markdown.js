'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    static associate(models) {

    }
  };
  Markdown.init({
    textMarkdown: DataTypes.TEXT('long'),
    textHTML: DataTypes.TEXT('long'),
    description: DataTypes.TEXT('medium'),
    doctorId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Markdown',
  });
  return Markdown;
};