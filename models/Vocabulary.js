module.exports = (sequelize, Sequelize) => {

    var User = sequelize.define('vocabulary', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        user_id: {
            type: Sequelize.INTEGER
        },

        vocabulary: {
            type: Sequelize.STRING,
            allowNull: false
        },

        translate: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return User
}