const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Job = require("./Job");

const Application = sequelize.define(
  "Application",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Job,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Selected", "Rejected"),
      defaultValue: "Pending",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "applications", // 👈 Explicitly specify the table name
    timestamps: true, // Ensures created_at & updated_at columns exist
    underscored: true,
  }
);

// Define Associations
User.hasMany(Application, { foreignKey: "user_id", onDelete: "CASCADE" });
Job.hasMany(Application, { foreignKey: "job_id", onDelete: "CASCADE" });
Application.belongsTo(User, { foreignKey: "user_id" });
Application.belongsTo(Job, { foreignKey: "job_id" });

module.exports = Application;
