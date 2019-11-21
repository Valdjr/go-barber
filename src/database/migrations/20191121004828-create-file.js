module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('files', {
            id: {
                type: Sequelize.INTEGER,
                allownULL: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allownULL: false,
            },
            path: {
                type: Sequelize.STRING,
                allownULL: false,
                unique: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allownULL: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allownULL: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('files');
    },
};
