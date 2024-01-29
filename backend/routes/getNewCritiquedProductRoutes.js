import express from 'express';
import { getNewCritiquedProduct} from '../controllers/critiquingController.js';

const router = express.Router();

router.route('/getNewCritiquedProduct').post(getNewCritiquedProduct)

export default router



