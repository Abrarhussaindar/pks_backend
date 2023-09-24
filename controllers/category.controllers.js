const express = require('express');
const Category = require('../models/Categories');

const CreateCategory = async (req, res) => {
    try{
        const newCategory = new Category({
            name: req.body.name,
            subCategories: req.body.subCategories,
        });

        const category = await newCategory.save();
        res.status(201).json(category);
    }catch(err){
        res.status(500).json(err);
    }

}

const GetCategory = async (req, res) => {
    try{
        const category = await Category.find({name: req.params.name})
        res.status(200).json(category);
    }catch(err){
        res.status(500).json(err);
    }
}


module.exports = { CreateCategory, GetCategory }