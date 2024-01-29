// import {getOneFilterTotalValue} from '../controllers/filterController.js'
import {getAllFilterTotalValue} from '../controllers/filterController.js'

import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// router.route('/getOneFilterTotalValue').get(getOneFilterTotalValue)
router.route('/getAllFilterTotalValue').get(getAllFilterTotalValue)

export default router