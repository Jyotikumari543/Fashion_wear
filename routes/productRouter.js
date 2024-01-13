import express from 'express'
import {isAdmin,requiresSignIn} from './../middlewares/authMiddleware.js'
import{createProductController,
        getSingleProductController,
         updateProductController,
         productPhotoController,
         deleteProductController, 
         getProductController,
         productFiltersController,
         productCountController,
         productListController,
         searchProductController,
         relatedProductController,
         productCategoryController,
         braintreeTokenController,
         braintreePaymentController} from "./../controllers/productController.js";
import formidable from 'express-formidable';

const router = express.Router()
//routes
//create product
router.post(
        '/create-product',
        requiresSignIn,
        isAdmin,
        formidable(),
        createProductController);
//update category
router.put(
        '/update-product/:pid'
        ,requiresSignIn,
        isAdmin,
        updateProductController)
//updateall product
//router.put('/updateall-product/:pid',requiresSignIn,isAdmin,updateallProductController)
//getAll product
router.get('/get-product',getProductController)

//single category
router.get('/get-product/:slug',getSingleProductController)
//get photo
router.get('/product-photo/:pid',productPhotoController)


//delete category
router.delete('/delete-product/:pid',requiresSignIn,isAdmin,deleteProductController)

//filter product
router.post('/product-filters',productFiltersController)

//product count
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page',productListController)

//search product
router.get('/search/:keyword',searchProductController)

router.get('/related-product/:pid/:cid',relatedProductController)


router.get('/product-category/:slug',productCategoryController);

//payment router
//token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requiresSignIn,braintreePaymentController)
export default router; 