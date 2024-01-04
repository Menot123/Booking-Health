'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Specialty', {
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
            image: {
                type: Sequelize.STRING
            },
            descriptionVi: {
                type: Sequelize.TEXT
            },
            descriptionEn: {
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('Specialty');
    }
};