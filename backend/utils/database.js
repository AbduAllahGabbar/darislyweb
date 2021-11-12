const Sequelize = require("sequelize");
const path = require("path");
const Umzug = require("umzug");

const config = require(__dirname + "/../config/config");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, "../migrations"),
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
  },
});

exports.sequelize = sequelize;

exports.up = async () => {
  await umzug.up();
  console.log("All migrations performed successfully");
};
