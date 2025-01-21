import { up, down } from './20230405144301-seed-data.js';


async function runSeed(method, queryInterface, sequelize) {

  try {
    if (method === 'up') {
      await up(queryInterface, sequelize);
    } else {
      await down(queryInterface, sequelize);
    }
  } catch (error) {
    console.error('Error running seed:', error);
  } finally {
    console.log('seed ended');
  }
}

export { runSeed };
