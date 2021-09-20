module.exports = (sequelize, Sequelize) => {

    var Dictionary = sequelize.define('dictionary', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        vocabulary: {
            type: Sequelize.TEXT
        },

        translate: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'dictionary'
    });
    return Dictionary
}