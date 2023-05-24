Steps to install and run MariaDB on your Raspberry Pi:

1. Update the system: Start by updating your Raspberry Pi's system packages to ensure you have the latest software.

   ```shell
   sudo apt update
   sudo apt upgrade
   ```

2. Install MariaDB Server: Use the following command to install the MariaDB Server package.

   ```shell
   sudo apt install mariadb-server-10.0
   ```

   During the installation process, you will be prompted to set a root password for the MariaDB Server.

3. Secure the MariaDB installation: After the installation is complete, you can run the secure installation script to enhance the security of your MariaDB installation.

   ```shell
   sudo mysql_secure_installation
   ```

   Follow the prompts to set up the security options for your MariaDB Server.

4. Start the MariaDB service: Once the installation and configuration are done, start the MariaDB service.

   ```shell
   sudo systemctl start mysql
   ```

   You can also enable the service to start automatically on boot:

   ```shell
   sudo systemctl enable mysql
   ```

5. Access MariaDB: To access the MariaDB command-line interface, use the following command:

   ```shell
   sudo mysql
   ```

   You can now execute SQL commands and interact with the MariaDB server.

---

In order to connect remotely, you have to have MySQL bind port 3306 to your machine's IP address in my.cnf. Then you have to have created the user in both localhost and '%' wildcard and grant permissions on all DB's as such . See below:

__my.cnf (my.ini on windows)__

1. Replace localhost adress
   ```SQL
    bind-address = 0.0.0.0
   ```

2. Then create a user:
   ```SQL
    CREATE USER 'myuser'@'%' IDENTIFIED BY 'mypass';
   ```

3. Then grant the new user access and privileges:
   ```SQL
    GRANT ALL ON *.* TO 'myuser'@'%';
    FLUSH PRIVILEGES;
   ```

Depending on your OS, you may have to open port 3306 to allow remote connections.

---

If you want to connect to MariaDB using JavaScript (JS) instead of Python, you can use the `mysql` module in Node.js. Here's an example of how you can connect to MariaDB from a JavaScript file:

1. Install the required packages: Start by initializing a Node.js project in your desired directory and install the `mysql` package using npm.

   ```shell
   mkdir myproject
   cd myproject
   npm init -y
   npm install mysql
   ```

2. Create a JavaScript file: Create a new file, for example, `app.js`, and open it in a text editor.

   ```shell
   touch app.js
   nano app.js
   ```

3. Connect to MariaDB: Use the following code as an example to establish a connection with MariaDB and perform database operations.

   ```javascript
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

   ```

   Make sure to modify the connection parameters (host, user, password, and database) according to your specific MariaDB setup.

5. Run the JavaScript file: Save the `app.js` file and run it using Node.js.

   ```shell
   node app.js
   ```

   You should see the connection status and any query results printed to the console.

With these steps, you can connect to MariaDB using JavaScript (Node.js) and perform database operations from your Raspberry Pi.