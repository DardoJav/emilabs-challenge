import { Router } from 'express';
import { update, uploadSteps } from '../controllers/listingController.js';
const router = Router();

router.put('/:listingId', update);
router.post('/:listingId/steps/upload', uploadSteps);

export default router;