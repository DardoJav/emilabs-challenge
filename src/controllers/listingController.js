import { updateListingAndSteps, createStepsForListing  } from '../services/listingService.js';
import { createReadStream, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import Papa from 'papaparse';

const __dirname = dirname(fileURLToPath(import.meta.url));

const cleanJSON = (value) => {
  if (!value) return null;
  try {
    const sanitizedValue = value.replace(/^"|"$/g, '').replace(/""/g, '"');
    return JSON.parse(sanitizedValue);
  } catch (error) {
    console.error("Error trying to parse JSON:", value, error);
    return null;
  }
};

const update = async (req, res) => {
  try {
    // if (!req.decoded || !req.decoded.user) {
    //   return res.status(400).json({ message: 'User Not Found' });
    // }

    const updatedListing = await updateListingAndSteps(
      req.params.listingId,
      {
        companyName: req.body.companyName,
        companyLogo: req.body.companyLogo,
        name: req.body.name,
        description: req.body.description,
        info: req.body.info,
        state: req.body.state,
        gs: req.body.gs,
        criteria: req.body.criteria,
      },
      req.body.steps,
      // req.decoded.user
    );

    return res.status(200).json(updatedListing);
  } catch (error) {
    console.error(error);
    const statusCode = error.message === 'Listing Not Found' || error.message === 'Forbidden' ? 404 : 400;
    return res.status(statusCode).json({ message: error.message });
  }
};

const uploadSteps = async (req, res) => {
  try {
    if (!req.files || !req.files.csvFile) {
      return res.status(400).json({ message: 'CSV File is required' });
    }

    const { csvFile } = req.files;
    const uploadsDir = join(__dirname, '../uploads');

    if (!existsSync(uploadsDir)) mkdirSync(uploadsDir);

    const filePath = join(uploadsDir, csvFile.name);

    await fs.writeFile(filePath, csvFile.data);

    const fileContent = await fs.readFile(filePath, 'utf8');

    const steps = [];
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      complete: (parsedData) => {
        parsedData.data.forEach((row) => {
          try {
            const step = cleanJSON(row['step']);
            const listingFlow = cleanJSON(row['listingFlow']);
            steps.push({
              flowId: row['flowId'],
              name: row['name'],
              step,
              listingFlow,
            });
          } catch (err) {
            console.error("Error reading rows:", err);
          }
        });
      },
      error: (error) => {
        console.error("Error reading CSV:", error);
        throw new Error('Error parsing the CSV file');
      },
    });

    await createStepsForListing(req.params.listingId, steps);

    unlinkSync(filePath);

    return res.status(200).json({ message: 'Steps uploaded successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to upload steps' });
  }
};

export{
  update,
  uploadSteps,
};