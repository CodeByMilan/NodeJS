const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

//creating instance of Sequelize class and we have to give databaseName, userName , password, host and dialect
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
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
db.questions =require("./questionModel.js")(sequelize,DataTypes)
db.answers = require("./answerModel.js")(sequelize, DataTypes);


//relationship between tables
db.users.hasMany(db.questions)
db.questions.belongsTo(db.users)

db.questions.hasMany(db.answers)
db.answers.belongsTo(db.questions)

db.users.hasMany(db.answers)
db.answers.belongsTo(db.users)

//migration
db.sequelize.sync({ force: false}).then(() => {
  console.log("re-synced database successfully");
});
module.exports = db;
