'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Subsidiary, { foreignKey: 'subsidiary_id', as: 'subsidiary' });
      this.hasMany(models.platform_listings, { foreignKey: 'listing_id', as: 'platformListings' });
      this.hasMany(models.Step, { foreignKey: 'listingId', as: 'steps' });
    }
  }
  Listing.init({
    company_name: DataTypes.STRING,
    company_logo: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    criteria: DataTypes.STRING,
    info: DataTypes.STRING,
    state: DataTypes.STRING,
    gs: DataTypes.STRING,
    subsidiary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Listing',
  });
  return Listing;
};