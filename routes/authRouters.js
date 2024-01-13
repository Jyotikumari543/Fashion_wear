import express from 'express'
import {registerController,
        loginController,
testController,
forgotPasswordController,
updateProfileController,
getOrdersController,
getAllOrdersController,
OrderStatusController
} from '../controllers/authController.js'
import {isAdmin, requiresSignIn} from '../middlewares/authMiddleware.js';


//router object
const router = express.Router()
//routing
//Register || METHOD POST
router.post('/register',registerController);
//login || Post
router.post('/login',loginController);

router.post('/forgot-password',forgotPasswordController)
//test routes
router.get('/test',requiresSignIn,isAdmin,testController);

//protected route auth
router.get("/user-auth",requiresSignIn,(req,res)=>{
        res.status(200).send({ok:true});
});

//protected route auth
router.get("/admin-auth",requiresSignIn,isAdmin ,(req,res)=>{
        res.status(200).send({ok:true});
});

//update profile
router.put('/profile',requiresSignIn,updateProfileController);

//orders
router.get('/orders',requiresSignIn,getOrdersController);

// All orders
router.get('/all-orders',requiresSignIn,isAdmin,getAllOrdersController);
//order update
router.put("/order-status/:orderId",requiresSignIn,isAdmin,OrderStatusController)

export default router;