import express from 'express';
// import controllers for events
import EventsController from '../controllers/events.js';

const router = express.Router();

// define routes to get events
router.get('/', EventsController.getEvents);
router.get('/:eventId', EventsController.getEventById);

export default router;