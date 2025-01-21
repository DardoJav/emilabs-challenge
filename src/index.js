import express from 'express';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import listingRoutes from './routes/listingRoutes.js';
import { sequelize, connectToDatabase } from './config/database.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { runSeed } from './seeders/runseed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

const swaggerDocument = YAML.load(resolve(__dirname, './docs/swagger.yml'));

app.use(express.json());
app.use(fileUpload());

app.use('/api/listings', 	listingRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

(async () => {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();

    console.log('syncronizing models...');
    sequelize.sync({ force: true }).then(async () => {
      const queryInterface = sequelize.getQueryInterface();

      if (!queryInterface) {
        throw new Error('queryInterface not initialized');
      }
      console.log('Executing seed...');
      await runSeed('up', queryInterface, sequelize);
      console.log('Database synchronized and seed executed');
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('error trying to run the application:', error);
    process.exit(1);
  }
})();