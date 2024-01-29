import { authuser, getUserProfile, register, updateUser } from "../controllers/userController.js";
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router() 

router.post('/login', authuser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect,updateUser)
    
router.route('/register').post(register)

export default router


