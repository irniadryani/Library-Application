"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

const Session = sequelize.define(
  "session",
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sess: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "sessions",
  }
);

module.exports = Session;
