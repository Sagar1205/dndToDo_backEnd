const { Sequelize, DataTypes } = require("sequelize");

const db = require("../../connect");

const User = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

module.exports = User;
