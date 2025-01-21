'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class platform_listings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Listing, { foreignKey: 'listing_id', as: 'listing' });
    }
  }
  platform_listings.init({
    listing_id: DataTypes.INTEGER,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'platform_listings',
  });
  return platform_listings;
};