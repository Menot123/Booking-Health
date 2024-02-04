'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here


        }
    };
    Post.init({
        owner: DataTypes.STRING,
        type: DataTypes.STRING,
        title: DataTypes.STRING,
        titleImg: DataTypes.BLOB('long'),
        description: DataTypes.TEXT,
        fullContent: DataTypes.TEXT('long'),
        viewCount: DataTypes.INTEGER,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};