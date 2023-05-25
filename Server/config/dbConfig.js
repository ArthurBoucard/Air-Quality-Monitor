const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('air_quality_monitor', 'admin', 'admin', {
    host: '192.168.1.111',
    dialect: 'mysql',
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to MariaDB!');
    })
    .catch((error) => {
        console.error('Error connecting to MariaDB:', error);
    });

module.exports = sequelize;
