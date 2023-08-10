const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

// Create a new Sequelize model for Category
class Category extends Model {}

Category.init(
  {
    // Define fields/columns on model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // prevents duplicate category in DB
      unique: true,
    },
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;
