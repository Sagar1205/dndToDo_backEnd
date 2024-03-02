const { Sequelize, DataTypes } = require("sequelize");

const db = require("../../connect");

const List = db.define(
  "lists",
  {
    name: {
      type: DataTypes.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: "users",
      referencesKey: "id",
    },
  },
  { timestamps: false }
);

module.exports = List;
