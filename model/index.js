const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const env = process.env.NODE_ENV || "development";

// Model 불러오기
const DeliveryWorker = require("./delivery_worker");

const db = {};

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.DeliveryWorker = DeliveryWorker;

DeliveryWorker.init(sequelize);

DeliveryWorker.associate(db);

module.exports = db;
