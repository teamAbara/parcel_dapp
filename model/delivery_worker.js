const Sequelize = require("sequelize");
module.exports = class DeliveryWorker extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        worker_id: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        worker_pw: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        worker_address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        worker_phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        worker_public: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        worker_private: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "",
        },
      },
      {
        sequelize,
        modelName: "DeliveryWorker",
        tableName: "delivery_workers",
        timestamps: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {}
};
