const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const slugify  = require('slugify');

class categoryService{} ;


// @desc create new category
// @route POST api/v1/category
// @access private
categoryService.addCategory = asyncHandler(
    async (req,res,next)=>{
        const {body : {name}} = req;
        if(!name)
            return next(new ApiError('name of the category is missing', 400))
        const newCategory = await Category.create({
            name ,
            slug : slugify(name)
        })
        return res.status(201).send(newCategory)
    }
)

// @desc get all categories
// @route GET api/v1/category
// @access public
categoryService.getCategories = asyncHandler(
    async (req,res,next) =>{
        let {query : {page , limit}} = req;
        page  = page  * 1 || 1 ;
        limit = limit * 1 || 5 ;
        let skip = (page - 1) * limit ;
        const categories = await Category.find({}).skip(skip).limit(limit);
        return res.status(200).send({
            results : limit , 
            page ,
            data : categories
        });
    }
)

// @desc get all categories
// @route GET api/v1/category/:id
// @access public
categoryService.getCategory = asyncHandler(
    async (req,res,next) => {
        const {params : {id}} = req;
        const findCategory = await Category.findById(id);
        if(findCategory)
            return res.status(200).send({data : findCategory}) ;

        return next(new ApiError("no category as found with this id", 404));
    }
)

// @desc update specific categories
// @route PUT api/v1/category/:id
// @access private
categoryService.updateCategory = asyncHandler(
    async (req,res,next) =>{
        const {body : {name }, params : {id}} = req;
        const updatedCartegory = await Category.findOneAndUpdate(
            {_id : id} ,
            {name, slug : slugify(name)} ,
            {new : true}
        )
        if(updatedCartegory)
            return res.status(201).send({message : "updated successfully", data : updatedCartegory})
        
        return next(new ApiError("No category was found to update", 404))
    }
)


// @desc delete specific categories
// @route DELETE api/v1/category/:id
// @access private
categoryService.deleteCategory = asyncHandler(
    async (req,res,next) =>{
        const {params : {id}} = req;
        let deletedCategory = await Category.findByIdAndDelete(id);

        if(deletedCategory)
            return res.status(204).send()
        
        return next(new ApiError("No category was found to delete", 404))
    }
)

module.exports = categoryService;