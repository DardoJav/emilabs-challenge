'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
  // Country
  await queryInterface.bulkInsert('Countries', [{
    name: 'Argentina',
    code: 'AR',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'Mexico',
    code: 'MX',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'United States of America',
    code: 'US',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  // Company
  await queryInterface.bulkInsert('Companies', [{
    name: 'Company A',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'Company B',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'Company C',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  // Subsidiary
  await queryInterface.bulkInsert('Subsidiaries', [{
    name: 'Subsidiary A',
    logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
    country_id: 1,
    company_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    name: 'Subsidiary B',
    logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
    country_id: 2,
    company_id: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  // Listing
  await queryInterface.bulkInsert('Listings', [{
    company_name: 'Company A',
    company_logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
    name: 'Listing A',
    description: 'Some Listing',
    criteria: 'some criteria',
    info: 'some info',
    state: 'ACTIVE',
    gs: '',
    subsidiary_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    company_name: 'Company A',
    company_logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
    name: 'Listing B',
    description: 'Some Listing',
    criteria: 'some criteria',
    info: 'some info',
    state: 'INACTIVE',
    gs: '',
    subsidiary_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    company_name: 'Company B',
    company_logo: 'https://www.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg',
    name: 'Listing A',
    description: 'Some Listing',
    criteria: 'some criteria',
    info: 'some info',
    state: 'INACTIVE',
    gs: '',
    subsidiary_id: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  // platform_listings
  await queryInterface.bulkInsert('platform_listings', [{
    listing_id: 1,
    state: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    listing_id: 2,
    state: 'INACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    listing_id: 3,
    state: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  }]);

  // Steps
  await queryInterface.bulkInsert('Steps', [
    {
      listingId: 1,
      flowId: 1,
      name: 'Step 1A',
      step: JSON.stringify({ order: 1, description: 'First step of listing 1' }),
      listingFlow: JSON.stringify({ type: 'Flow A', details: 'Details of Flow A' }),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      listingId: 1,
      flowId: 2,
      name: 'Step 2A',
      step: JSON.stringify({ order: 2, description: 'Second step of listing 1' }),
      listingFlow: JSON.stringify({ type: 'Flow B', details: 'Details of Flow B' }),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      listingId: 2,
      flowId: 1,
      name: 'Step 1B',
      step: JSON.stringify({ order: 1, description: 'First step of listing 2' }),
      listingFlow: JSON.stringify({ type: 'Flow C', details: 'Details of Flow C' }),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      listingId: 3,
      flowId: 3,
      name: 'Step 3C',
      step: JSON.stringify({ order: 3, description: 'Third step of listing 3' }),
      listingFlow: JSON.stringify({ type: 'Flow D', details: 'Details of Flow D' }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('Companies', null, {});
  await queryInterface.bulkDelete('Countries', null, {});
  await queryInterface.bulkDelete('Subsidiaries', null, {});
  await queryInterface.bulkDelete('Listings', null, {});
  await queryInterface.bulkDelete('platform_listings', null, {});
  await queryInterface.bulkDelete('Steps', null, {});
}
