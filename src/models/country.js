'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Subsidiary, { foreignKey: 'country_id', as: 'subsidiaries' });
    }
  }
  Country.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};