import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from '../config/database.js';
import Sequelize from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const db = {};

const initializeModels = async () => {
  const files = fs.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.endsWith('.js'));

  for (const file of files) {
    const model = (await import(`file://${path.join(__dirname, file)}`)).default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
  console.log('db', db);

  Object.keys(db).forEach(modelName => {
    console.log('Configuring associations for model:', modelName);
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
};

await initializeModels();

export default db;
