'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Clinic', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nameVi: {
                type: Sequelize.STRING
            },
            nameEn: {
                type: Sequelize.STRING
            },
            addressVi: {
                type: Sequelize.STRING
            },
            addressEn: {
                type: Sequelize.STRING
            },
            descriptionEn: {
                type: Sequelize.TEXT('long')
            },
            descriptionVi: {
                type: Sequelize.TEXT('long')
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            markdownVi: {
                type: Sequelize.TEXT('long')
            },
            markdownEn: {
                type: Sequelize.TEXT('long')
            },
            status: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Clinic');
    }
};