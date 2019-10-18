module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
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
            email: {
                type: Sequelize.STRING,
                allownULL: false,
                unique: true,
            },
            password_hash: {
                type: Sequelize.STRING,
                allownULL: false,
            },
            provider: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allownULL: false,
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
        return queryInterface.dropTable('users');
    },
};
