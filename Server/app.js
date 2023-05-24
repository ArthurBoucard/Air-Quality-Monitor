const mysql = require('mysql');

// Create a connection
const connection = mysql.createConnection({
    host: '192.168.1.111',
    user: 'admin',
    password: 'admin',
    database: 'air_quality_monitor',
});

// Connect to MariaDB
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MariaDB:', error);
        return;
    }
    console.log('Connected to MariaDB!');

    // Perform database operations
    // Example: Execute a SQL query
    connection.query('SELECT * FROM measurements', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    console.log('Query results:', results);

    // Close the connection when finished with operations
    connection.end((error) => {
      if (error) {
        console.error('Error closing connection:', error);
        return;
      }
      console.log('Connection closed.');
    });
  });
});
