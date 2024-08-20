"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const UserModel = require("../models/UsersModel.js")

const Roles = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Roles.hasMany(UserModel, { foreignKey: 'role_id', as: 'users' });

module.exports = Roles;
