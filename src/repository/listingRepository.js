import db from '../models/index.js';
const { sequelize, Listing, Step } = db;
import { QueryTypes } from 'sequelize';

const selectListingQuery = () => {
  return `
    SELECT 
    Subsidiary.id as subsidiaryId,
    Country.name as countryName,
    Country.code as countryCode,
    COALESCE(Subsidiary.name, Company.name) as subsidiaryName,
    Listing.id,
    Listing.company_name as companyName,
    Listing.name,
    Listing.description,
    Listing.criteria,
    Listing.info,
    Listing.state,
    Listing.gs,
    CAST(COALESCE(PlatformListing.platform_listings, 0) AS SIGNED) as platformListings
  FROM listings AS Listing
  LEFT OUTER JOIN subsidiaries AS Subsidiary ON Listing.subsidiary_id = Subsidiary.id
  LEFT OUTER JOIN countries AS Country ON Subsidiary.country_id = Country.id
  LEFT OUTER JOIN companies AS Company ON Subsidiary.company_id = Company.id
  LEFT OUTER JOIN (
    SELECT l.listing_id as lid, COUNT(*) as platform_listings 
    FROM platform_listings AS l
    WHERE l.state = 'ACTIVE'
    GROUP BY lid
  ) AS PlatformListing ON Listing.id = PlatformListing.lid
  WHERE Listing.id = ?
  `;
};

const findListingById = async (id) => {
  return await Listing.findByPk(id);
};

const updateListing = async (id, data) => {
  return await Listing.update(data, { where: { id }, returning: true });
};

const findStepsByListingId = async (listingId) => {
  return await Step.findAll({ where: { listingId } });
};

const bulkCreateSteps = async (steps) => {
  console.log("steps",steps);
  return await Step.bulkCreate(steps);
};

const deleteSteps = async (ids) => {
  return await Step.destroy({ where: { id: ids } });
};

const updateStep = async (id, data) => {
  return await Step.update(data, { where: { id } });
};

const getListingWithDetails = async (id) => {
  const query = selectListingQuery();
  return await sequelize.query(query, { replacements: [id], type: QueryTypes.SELECT });
};

export {
  findListingById,
  updateListing,
  findStepsByListingId,
  bulkCreateSteps,
  deleteSteps,
  updateStep,
  getListingWithDetails,
};