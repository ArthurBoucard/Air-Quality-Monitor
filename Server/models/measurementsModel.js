const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const MeasurementsModel = sequelize.define('Measurements', {
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    pressure: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    gas: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    co2: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    humidity: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    iaq: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'measurements',
});

module.exports = MeasurementsModel;
