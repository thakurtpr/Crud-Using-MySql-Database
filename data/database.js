const mysql = require("mysql");

const connectDB = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crud",
  });

  connection.connect((error) => {
    if (error) {
      console.log(error);
      return;
    }
  });
  return connection;
};

module.exports = { connectDB };
