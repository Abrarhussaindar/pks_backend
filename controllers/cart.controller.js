const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// {
//     "userId": "650db1f17d52aa044bfb1abe",
//     "products": [
//         {
//           "productId": "650c25b9911a0dcc346d9d03",
//           "quantity": 1
//         }
//       ]
//   }
const createCart = async (req, res) =>{
    
    try{
        console.log(req.params)
        // const product = await Product.find({_id: req.params.id});

        // console.log(product)
        console.log(req.body)
        const newCart =  new Cart({
            userId: req.body.userId,
            products: [
                {
                    productId: req.params.id,
                    quantity: req.body.quantity
                }
            ]
        });
        const savedCart = await newCart.save();
        console.log("saved ", savedCart)
        res.status(201).json(savedCart);
    }catch(err){
        res.status(500).json("not allowed to upload the products")
    }
}


const updateCart = async (req, res) =>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }
        );
        res.status(200).json(updatedCart)
    }catch(err){
        res.status(500).json("not allowed to update the cart")
    }
}

const deleteCart = async (req, res) =>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("cart has been deleted")
    }catch(err){
        res.status(500).json("not allowed to delete the cart")
    }
}

const getCart = async (req, res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
}

const getAllCarts = async (req, res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = { createCart, getCart, getAllCarts, deleteCart, updateCart }