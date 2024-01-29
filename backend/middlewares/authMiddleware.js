import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
    // console.log("---protect req.body---")
    // console.log(req.body)
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-passwprd')
            next()
        }catch(error){
            console.log(error);
            res.status(401).json({"error":"no authentic token"});
        }
    }

    if(!token){
        res.status(401).json({"error":"no token found, please login first"});

    }
}

export {protect}