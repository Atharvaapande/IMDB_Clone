const { Sequelize } = require("sequelize");
require("dotenv").config();

// Fetch MySQL URI from environment variables
const mysqlUri = process.env.MYSQL_URI;

// Create a Sequelize instance using the URI
const sequelize = new Sequelize(mysqlUri, {
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 60000, // Increase timeout to 60 seconds
  },
});

// Test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
