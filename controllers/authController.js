import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"
import JWT from 'jsonwebtoken'; 

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address ,answer} = req.body;

        // Validates
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: 'User already exists. Please login.',
            });
        }

        // Register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,
        
        }).save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in registration',
            error: error.message,
        });
    }
};

// Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email is not registered',
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password',
            });
        }

        // Create and send token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                answer:user.answer,
                role:user.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in login',
            error: error.message,
        });
    }
};
//forgotPasswordController
export const forgotPasswordController= async(req,res)=>{
    try{
        const { email, answer, newPassword } = req.body;
        if (!email || !answer || !newPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        //check
        const user = await userModel.findOne({email,answer})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email Or Answer'
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully",
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"something went Wrong",
            error:error.message
        })    }
}


//test controller
export const testController = (req,res) => {
    try{
        res.send("Protected route");
    }catch(error){
console.log(error);
res.send({error});
    }
     
};

//update profile
export const updateProfileController=async(req,res)=>{
    try{
        const {name,email,password,address,phone}=req.body
        const user = await userModel.findById(req.user._id)

        //password
        if(password && password.length<5){
            return res.json({error:'password is required and 5 character long'})
        }
         const hashedPassword=password?await hashPassword(password):undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name:name||user.name,
            password:hashedPassword||user.password,
            phone:phone||user.phone,
            address:address||user.address
        },{new:true}
        );
        res.status(200).send({
            success:true,
            message:"user profile updated succesfully",
            updatedUser
        })

    }catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:"something went Wrong while updating",
            error:error.message
        })  
    }
};

//orders
export const getOrdersController=async(req,res)=>{
    try{
        const orders = await orderModel
        .find({buyer:req.user._id})
        .populate("products","-photo")
        .populate("buyer","name")

        res.json(orders)

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting Orders",
            error:error.message
        })    
    }
}

//orders
export const getAllOrdersController=async(req,res)=>{
    try{
        const orders = await orderModel
        .find({})
        .populate("products","-photo")
        .populate("buyer","name")
        .sort({createdAt:-1})
        res.json(orders);

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting Orders",
            error:error.message
        })    
    }
};

//order status
export const OrderStatusController =async(req,res)=>{
    try{
const{orderId}=req.params;
const{status}= req.body;
const orders= await orderModel.findByIdAndUpdate(
    orderId,
    {status},
    {new:true}
);
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while updating Orders",
            error:error.message
        })  
    }
}