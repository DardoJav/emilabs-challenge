'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Listing, { foreignKey: 'listingId', as: 'listing' });
    }
  }
  Step.init({
    listingId: DataTypes.INTEGER,
    flowId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    step: DataTypes.JSON,
    listingFlow: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Step',
  });
  return Step;
};