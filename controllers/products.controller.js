const express = require('express');
const Product = require('../models/Product');

const uploadProduct = async (req, res) =>{
    const newProduct =  new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }catch(err){
        res.status(500).json("not allowed to upload the products")
    }
}

const updateProduct = async (req, res) =>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true}
        );
        res.status(200).json(updatedProduct)
    }catch(err){
        res.status(500).json("not allowed to update the product")
    }
}

const deleteProduct = async (req, res) =>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("product has been deleted")
    }catch(err){
        res.status(500).json("not allowed to delete the products")
    }
}

const getProduct = async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }
}

const getAllProducts = async (req, res)=>{
    const qRandom = req.query.random;
    const qCategory = req.query.category;
    try{
        let products;

        if(qRandom){
            res.status(200).json("random products here")
        }else if(qCategory){
            products = await Product.find({
                category: {
                    $in: [qCategory],
                }
            })
        }else{
            products = await Product.find()
        }
        res.status(200).json(products)
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {  uploadProduct, updateProduct, deleteProduct, getProduct, getAllProducts }