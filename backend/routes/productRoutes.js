import express from 'express';
import { getProducts, getProductById, getProductBySearch, createProductReview, getTopProducts } from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

// Order is very important!!!
router.route('/').get(getProducts)
router.route('/topProducts').get(getTopProducts)
router.route('/bySearch').get(getProductBySearch)
router.route('/:id').get(getProductById)
router.route('/:id/reviews').post(protect, createProductReview)

export default router



