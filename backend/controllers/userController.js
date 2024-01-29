import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc User login
// @route POST /api/user/login
// @access Private
const authuser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            }
        )
    } else {

        res.status(401).json({ message: 'User not authorized' })
        // throw new Error("Invalid email or password")
    }

}




// @desc Get user profile
// @route GET /api/user/profile
// @access Private

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404).json({ "error": 404 });
    }
}


// @desc Register user
// @route POST /api/user/register
// @access Public

const register = async (req, res) => {
    const { email, name, password } = req.body;
    console.log("---register: req.body---")
    console.log(req.body)
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400).json({
            message: "User already exists"
        })

    } else {    
        try {

            const user = await User.create({ email, name, password })

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id)
                })
            } else {
                res.status(400).json({ message: "Invalid user data" });
            }
        } catch (error) {
            res.status(400).json({ message: "Invalid user data", error: error });
        }
    }
}




// @desc Update user
// @route PUT /api/users/register
// @access Private

const updateUser = async (req,res)=>{

    const {email,name,password} = req.body
    const user = await User.findById(req.user._id)
    if(user){
        try{
            user.name = name || user.name
            user.email = email || user.email
            user.password = password || user.password
            const updateUser = await user.save()
    
            res.json({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser._id)
            })
        }
        catch(error){
            res.status(400).json({
                message:"Email was occurpied",
                error:error
            })
        }
        
    }else{
        res.status(404).json({
            error:"User not found!"
        })
    }
}

export { authuser, getUserProfile, register, updateUser }