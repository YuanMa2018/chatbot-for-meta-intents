import express from 'express';
import { download_interactions } from '../controllers/interactionTrackController.js';
import { submit_interactions } from '../controllers/interactionTrackController.js';

const router = express.Router();

router.route('/download').get(download_interactions)
router.route('/submit').post(submit_interactions)


export default router
