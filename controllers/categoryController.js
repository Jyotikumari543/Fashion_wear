import CategoryModel from "../models/CategoryModel.js";
import categoryModel from "../models/CategoryModel.js";
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: 'Name is required' });
        }

        const existingCategory = await categoryModel.findOne({ name });

        if (existingCategory) {
            return res.status(200).json({
                success: true,
                message: 'Category already exists',
                category: existingCategory // Returning the existing category
            });
        }

        const newCategory = new categoryModel({
            name,
            slug: slugify(name)
        });

        const savedCategory = await newCategory.save();

        res.status(201).json({
            success: true,
            message: "New category created",
            category: savedCategory // Returning the newly created category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error in creating category'
        });
    }
};

//update category
export const updateCategoryController=async (req,res)=>{
try{
        const{name}=req.body;
        const {id}=req.params;
        const category = await CategoryModel.findByIdAndUpdate(
                id,
                {name,slug:slugify(name)},
                {new:true}
        );
        res.status(200).send({
                success:true,
                
                message:"Category updated Successfully",
                category
        });

}catch(error){
        console.log(error);
        res.status(500).send({
                success:false,
                error:error.message,
                message:"Error while updating category"
        });
}

};


export const categoryController = async(req,res)=>{
try{
        const category = await categoryModel.find({})
        res.status(200).send({
                success:true,
                message:'All categories List',
                category,

        })

}catch(error){
        console.log(error)
        res.status(500).send({
                success:false,
                message:'Error while getting all categories',
                error:error.message
        })
}
};



export const singleCategoryController = async(req,res)=>{
        try{
                const category = await categoryModel.findOne({slug:req.params.slug});
                res.status(200).send({
                        success:true,
                        message:'Get single categories successfully',
                        category,
        
                });
        
        }catch(error){
                console.log(error);
                res.status(500).send({
                        success:false,
                        message:'Error while getting single categories',
                        error:error.message
                });


               
        }
        };

        //delete 
        export const deleteCategoryController=async(req,res)=>{
                try{
                        const {id}=req.params;
                        await  categoryModel.findByIdAndDelete(id);
                        res.status(200).send({
                                success:true,
                                message:'delete single categories successfully',
                               
                
                        });
                
                }catch(error){
                        console.log(error);
                        res.status(500).send({
                                success:false,
                                message:'Error while deleting single categories',
                                error:error.message
                        });
        
        
                       
                }
        }