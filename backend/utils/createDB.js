require("dotenv").config();
const mysql = require("mysql2/promise");

mysql
  .createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .then((connection) => {
    connection
      .query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE} DEFAULT CHARACTER SET utf8;`
      )
      .then((res) => {
        console.info("Database created or successfully checked");
        process.exit(0);
      });
  });
