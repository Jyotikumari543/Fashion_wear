import productModel from "../models/ProductModel.js";
import categoryModel from '../models/CategoryModel.js'
import orderModel from '../models/orderModel.js'
import fs from 'fs'
import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import braintree from "braintree";
import dotenv from 'dotenv';

dotenv.config();
//PAYMENT GATEWAY
var gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY,
      });


export const createProductController = async (req, res) => {
    try {
        const { name,slug,description,price,category,quantity,shipping } = req.fields;
        const { photo} =req.files

        //validations
        if (!name||!description||!price||!category||!quantity||!shipping) {
            return res.status(400).json({ success: false, message: 'All the fileds are required' });
        }
        if(!photo && photo.size>1000000){
                return res.status(400).json({ success: false, message: 'photo are required' });
        }

        const products = new ProductModel({...req.fields,
            slug: slugify(name)});
        if(photo){
                products.photo.data = fs.readFileSync(photo.path);
                products.contentType=photo.type;
        }

        await products.save();

        res.status(201).json({
            success: true,
            message: "New products created",
            products // Returning the newly created products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error in creating product'
        });
    }
};


//update category
export const updateProductController=async (req,res)=>{
        try {
       
                  
                      const { name, description, price, category, quantity, shipping } = req.fields;
                      const { photo } = req.files;
                                if (!req.fields) {
                        return res.status(400).json({ success: false, message: 'Fields are missing in the request.' });
                      }
                if(!photo && photo.size>1000000){
                        return res.status(400).json({ success: false, message: 'photo are required' });
                }
        
                const products = await ProductModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)}
                ,{new:true});
                if(photo){
                        products.photo.data = fs.readFileSync(photo.path);
                        products.contentType=photo.type;
                }
        
                await products.save();
        
                res.status(201).json({
                    success: true,
                    message: "products updates created",
                    products // Returning the newly created products
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Error in updating product'
                });
            }

};
//get All products

export const getProductController = async(req,res)=>{
try{
        const products = await ProductModel
        .find({})
        
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1});
        res.status(200).send({
                success:true,
                message:'All product List',
                countTotal:products.length,
                products,

        })

}catch(error){
        console.log(error)
        res.status(500).send({
                success:false,
                message:'Error in getting products',
                error:error.message
        })
}
};



export const getSingleProductController = async(req,res)=>{
        try{
                const products = await ProductModel
                .findOne({slug:req.params.slug})
                .select("-photo")
                
                res.status(200).send({
                        success:true,
                        message:'Get single product successfully',
                        products,
        
                });
        
        }catch(error){
                console.log(error);
                res.status(500).send({
                        success:false,
                        message:'Error while getting single product',
                        error:error.message
                });


               
        }
        };

        //get photo
        export const productPhotoController=async(req,res)=>{
           try{
                const product = await productModel.findById(req.params.pid).select("photo");
                if(product.photo.data){
                        res.set("Content-type",product.photo.contentType);
                        return res.status(200).send(product.photo.data);

                }

           } catch(error){
                console.log(error);
                res.status(500).send({
                        success:false,
                        message:'Error while getting photo',
                        error:error.message
                });  
           }    

        }

        //delete 
        export const deleteProductController=async(req,res)=>{
                try{
                        const {pid}=req.params;
                        await  ProductModel.findByIdAndDelete(pid).select("-photo");
                        res.status(200).send({
                                success:true,
                                message:'delete single product successfully',
                               
                
                        });
                
                }catch(error){
                        console.log(error);
                        res.status(500).send({
                                success:false,
                                message:'Error while deleting single product',
                                error:error.message
                        });
        
        
                       
                }
        };

        //updateall product
/*  
        export const updateallProductController = async (req, res) => {
                
                try {
                        const { name,description,price,category,quantity,shipping } = req.fields;
                        const { photo} =req.files
                
                        //validations
                        if (!name||!description||!price||!category||!quantity||!shipping) {
                            return res.status(400).json({ success: false, message: 'All the fileds are required' });
                        }
                        if(!photo && photo.size>1000000){
                                return res.status(400).json({ success: false, message: 'photo are required' });
                        }
                
                        const products = new ProductModel.findByIdAndUpdate(req.params.pid,
                                {
                            ...req.fields,
                            slug: slugify(name)
                        },{new:true});
                        if(photo){
                                newProduct.photo.data = fs.readFileSync(photo.path);
                                newProduct.photo.contentType=photo.type;
                        }
                
                         await products.save();
                
                        res.status(201).json({
                            success: true,
                            message: "New products created",
                            products // Returning the newly created products
                        });
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({
                            success: false,
                            error: error.message,
                            message: 'Error in creating product'
                        });
                    }
                };
                */


       export const productFiltersController=async(req,res)=>{
        try{
                const{checked,radio}=req.body;
                let args={};
                if(checked.length>0) args.category=checked;
                if(radio.length) args.price ={$gte:radio[0],$lte:radio[1]};
                const products= await productModel.find(args);
                res.status(200).send({
                        success:true,
                        products,
                });

        }catch(error){
                console.log(error);
                res.status(400).send({
                        success:false,
                        message:"Error while filtering product",
                        error:error.message
                });
        }
       } ;
       
       //count product
       export const productCountController=async(req,res)=>{
        try{
                const total= await productModel.find({}).estimatedDocumentCount();
                res.status(200).send({
                        success:true,
                        total,
                });

        }catch(error){
                console.log(error);
                res.status(400).send({
                        success:false,
                        message:"Error in product count",
                        error:error.message
                });
        }
       };

       export const productListController = async(req,res)=>{
        try{
                const perPage=2;
                const page= req.params.page?req.params.page:1;
                const products= await productModel.find({}).select("-photo")
                .skip((page -1)*perPage)
                .limit(perPage)
                .sort({createdAt:-1});
                res.status(200).send({
                        success:true,
                        products,
                })

        }catch(error){
                console.log(error);
                res.status(400).send({
                        success:false,
                        message:"Error in per page ctrl",
                        error:error.message
                });     
        }
       };

       export const searchProductController=async(req,res) =>{
        try{
                const {keyword}=req.params;
                const results=await productModel
                .find({
                        $or:[
                        {name:{$regex:keyword,$options: "i"}},
                        {description:{$regex:keyword,$options: "i"}},

                ],}).select("-photo");
                res.json(results);

        }catch(error){
                console.log(error);
                res.status(400).send({
                        success:false,
                        message:"Error in Search API",
                        error:error.message
                });   
        }
       };

       export const relatedProductController = async (req,res)=>{
        try{
                const {pid,cid}=req.params;
                const products= await productModel.find({category:cid,_id:{$ne:pid},})
                .select("-photo")
                .limit(3)
                .populate("category");
                res.status(400).send({
                        success:true,
                        products,
                }); 

        }catch(error){
                console.log(error);
                res.status(400).send({
                        success:false,
                        message:"Error while getting related product",
                        error:error.message
                });    
        }
       };

       //get product by category
       export const productCategoryController = async(req,res)=>{
        try{
                const category = await categoryModel.findOne({slug:req.params.slug})
                const products= await productModel.find({category}).populate('category')
                res.status(200).send({
                        success:true,
                        category,
                        products
                })

        }catch(error){
                console.log(error)
                res.status(400).send({
                        success:false,
                        error:error.message,
                        message:'Error while Getting products'
                })
        }
       };
//payment gateway
//token

       export const braintreeTokenController= async(req,res)=>{
        try{
                gateway.clientToken.generate({},function(err,response){
                        if(err){
                   res.status(500).send(err);
                        }else{
                       res.send(response);
                        }
                });

        }catch(error){
                console.log(error)
        }

       };

       //payment
       export const braintreePaymentController=async(req,res)=>{
        try{
                const{cart,nonce}=req.body;
                let total= 0;
                cart.map((i)=>{
                        total += i.price;

                });
                let newTransaction = gateway.transaction.sale(
                 {
                        amount:total,
                        paymentMethodNonce:nonce,
                        options:{
                                submitForSettlement:true,
                        },
                 } ,
                  function(error,result){
                        if(result){
                                const order = new orderModel({
                         products:cart,
                         payment:result,
                         buyer:req.user._id,
                                }).save();
                                res.json({ok:true});
                        }else{
                  res.status(500).send(error);
                        }
                  }     
                );

        }catch(error){
                console.log(error)
        }

       };