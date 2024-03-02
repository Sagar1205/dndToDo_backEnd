const { Sequelize, DataTypes } = require("sequelize");

const db = require("../../connect");

const Task = db.define(
  "tasks",
  {
    task: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.BOOLEAN,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: "users",
      referencesKey: "id",
    },
    listId: {
      type: Sequelize.INTEGER,
      references: "lists",
      referencesKey: "id",
    },
  },
  { timestamps: false, }
);

module.exports = Task;
