const express = require('express');
const Cart = require('../models/Cart');

const createCart = async (req, res) =>{
    const newCart =  new Cart(req.body)

    try{
        const savedCart = await newCart.save();
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
            },
            { new: true}
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