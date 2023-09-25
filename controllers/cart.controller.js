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
// }

const createCart = async (req, res) =>{
    const exCart = await Cart.findOne({userId: req.body.userId});
    if(exCart){
        try{
            const product = await Product.findById(req.params.id);
            const newProduct = {
                productId: product._id,
            }
            exCart.products.push(newProduct)
            const savedCart = await exCart.save();
            res.status(201).json(savedCart);
        }catch(err){
            console.log(err)
        }
    }else{
        try{
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
            res.status(201).json(savedCart);
        }catch(err){
            res.status(500).json("not allowed to upload the products")
        }
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
// 6511336ab1458f7e1a949122
const updateProductQuantity = async (req, res) =>{
    try{
        const exCart = await Cart.findById(req.params.id);
        console.log("ex cart: ", exCart.products);
        exCart.products.forEach((product)=>{
            if(product.productId === req.body.productId){
                product.quantity = req.body.quantity;
            }
        })
        const upCart = await exCart.save();
        console.log("updated cart: ", upCart);
        res.status(201).json(upCart);
    }catch(err){
        res.status(500).json("not allowed")
    }

    // try{
    //     const updatedCart = await Cart.findByIdAndUpdate(
    //         req.params.id,
    //         {
    //             $set: req.body,
    //         }

    //     );
    //     res.status(200).json(updatedCart)
    // }catch(err){
    //     res.status(500).json("not allowed to update the cart")
    // }
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

module.exports = { createCart, updateProductQuantity, getCart, getAllCarts, deleteCart, updateCart }