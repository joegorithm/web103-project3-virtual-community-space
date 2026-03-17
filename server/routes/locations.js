import express from 'express';
// import controllers for locations
import LocationsController from '../controllers/locations.js';

const router = express.Router();

// define routes to get locations
router.get('/', LocationsController.getLocations);
router.get('/:eventId', LocationsController.getLocationById);

export default router;