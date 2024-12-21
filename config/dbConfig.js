module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "nodeJs",
  DIALECT: "mysql",
  pool: {
    max: 5,  //no of connection can be created
    min: 0,
    acquire: 30000,     
    idle: 10000,  //waiting for a connection or idle for 10 seconds before releasing it
  },
};
