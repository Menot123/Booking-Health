'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Post', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            owner: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            titleImg: {
                type: Sequelize.BLOB('long')
            },
            description: {
                type: Sequelize.TEXT
            },
            fullContent: {
                type: Sequelize.TEXT('long')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'active'
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Post');
    }
};