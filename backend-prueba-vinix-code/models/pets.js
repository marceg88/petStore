'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pets.belongsTo(models.Category, {
        foreignKey: 'id',
        target_key: 'categoryId'
      })
      Pets.belongsTo(models.Tags, {
        foreignKey: 'id',
        target_key: 'tagsId'
      })
    }
  }
  Pets.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    photoUrls: DataTypes.STRING,
    tagsId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pets',
  });
  return Pets;
};