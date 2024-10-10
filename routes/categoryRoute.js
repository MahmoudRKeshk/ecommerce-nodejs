const express = require('express');
const { addCategory , getCategories, getCategory, updateCategory, deleteCategory}  = require ('../services/categoryService') 
const {param, query ,validationResult} = require('express-validator');


const router = express.Router();
router.route('/')
    .get(getCategories)
    .post(addCategory)

router.route('/:id')
    .get(
        param('id').isMongoId().withMessage('Invalid mongo id') ,
        
        (req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).send({errors : errors.array()})
        }

    } ,
        getCategory)
    .put(updateCategory)
    .delete(deleteCategory)


module.exports = router