const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

//creating instance of Sequelize class and we have to give databaseName, userName , password, host and dialect
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: false,
  port: 3306,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// checking whether we are able to connect to database or not
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to database: ", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//importing model files
db.users = require("./userModel.js")(sequelize, DataTypes);
db.blogs =require("./blogModel.js")(sequelize,DataTypes)

//migration
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-synced database successfully");
});
module.exports = db;
